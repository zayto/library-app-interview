import { InjectQueue } from '@nestjs/bull';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Queue } from 'bull';
import { Model } from 'mongoose';
import { Book, BookDocument } from './models/book.schema';
import {
  BookStatusEnum,
  IBookRequest,
  IBookResponse,
  IUserResponse,
} from './models/interfaces';
import { ReferencesService } from './references/references.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    @Inject('USERS_SERVICE')
    private readonly usersClient: ClientProxy,
    @InjectQueue('returnedBooks') private returnedBooksQueue: Queue,
    private bookRefsService: ReferencesService,
  ) {}

  public async getBookById(id: string): Promise<IBookResponse | null> {
    Logger.log(`GetBookById called with id ${id}`);
    return await this.bookModel.findById(id);
  }

  public async getBookByReference(ref: string): Promise<IBookResponse | null> {
    Logger.log(`GetBookByReference called with ref ${ref}`);
    return await this.bookModel.findOne({ reference: ref });
  }

  public async getAllBooks(): Promise<Book[]> {
    Logger.log(`GetAllBooks called`);
    return this.bookModel.find().exec();
  }

  public async createBook(book: IBookRequest): Promise<IBookResponse> {
    Logger.log(`CreateBook called with payload`, {
      book: JSON.stringify(book),
    });
    if (!book.reference) {
      throw new Error('Book reference is required to create a book');
    }
    // Add new quantity to associated book ref (throws if reference is invalid)
    await this.bookRefsService.addNewBookQuantity(book.reference, 1);
    // Add new book
    return await this.bookModel.create({
      ...book,
      status: BookStatusEnum.AVAILABLE,
      owner: null,
    });
  }

  public async borrowBook(
    bookRefId: string,
    userId: string,
  ): Promise<IBookResponse> {
    Logger.log(
      `BorrowBook called with bookRefId=${bookRefId} and userId=${userId}`,
    );
    // Check if user is valid and exists
    let user: IUserResponse;
    try {
      user = await this.usersClient
        .send<IUserResponse>('get_user', {
          id: userId,
        })
        .toPromise();
    } catch (err) {}
    if (!user) {
      throw new Error(
        `User with id=${userId} does not exist - can't borrow book for user.`,
      );
    }
    // Check if book exists and is available or not
    const bookRef = await this.bookRefsService.getBookReferenceById(bookRefId);
    if (!bookRef) {
      throw new Error(
        `Invalid book ref provided, ref=${bookRefId} does not exist`,
      );
    }
    try {
      // Update the associated book ref (-1 quantity)
      await this.bookRefsService.borrowBookAndUpdateBookRef(bookRef);
    } catch (error) {
      Logger.error(
        `Error while trying to borrow book with bookRefId=${bookRefId}, err: ${error?.message}`,
      );
      throw error;
    }

    // Book is available, retrieve next valid book to be borrowed, update its data and return it
    const borrowed = await this.borrowPhysicalBook(bookRefId, userId);

    return borrowed;
  }

  public async returnBook(bookRefId: string, userId: string): Promise<void> {
    Logger.log(
      `ReturnBook called with bookRefId=${bookRefId} and userId=${userId}`,
    );
    // Check if user is valid and exists
    let user: IUserResponse;
    try {
      user = await this.usersClient
        .send<IUserResponse>('get_user', {
          id: userId,
        })
        .toPromise();
    } catch (err) {}
    if (!user) {
      throw new Error(
        `User with id=${userId} does not exist - can't borrow book for user.`,
      );
    }
    // Check if it's a valid book ref
    const bookRef = await this.bookRefsService.getBookReferenceById(bookRefId);
    if (!bookRef) {
      throw new Error(
        `Invalid book ref provided, ref=${bookRefId} does not exist`,
      );
    }
    // Check if a book with this ref was indeed borrowed by the retrieved user
    try {
      // TODO
    } catch (error) {
      // TODO
    }

    // Book was indeed borrowed, add it to queue of returned books to handle
    const fakeBookId = '6218c9a3f9b7260d758753c1'; // TODO Retrieve book id from repository or from user's bookIds array
    const fakeRefId = '6216c59ca9ca02ff313aaa78'; // TODO Retrieve book id from repository or from user's bookIds array
    const fakeUserId = '6209880b6f43a7e034c84943'; // TODO Retrieve book id from repository or from user's bookIds array
    try {
      await this.addReturnedBookToQueue(fakeBookId, fakeRefId, fakeUserId);
    } catch (error) {
      // TODO
    }
  }

  private async borrowPhysicalBook(
    bookRefId: string,
    userId: string,
  ): Promise<IBookResponse> {
    const borrowed = await this.getNextBookToBorrow(bookRefId);

    await this.updateBookOwner(borrowed, userId);

    return borrowed;
  }

  private async getNextBookToBorrow(bookRefId: string): Promise<IBookResponse> {
    const book = await this.bookModel.findOne({
      reference: bookRefId,
      owner: null,
    });
    if (!book) {
      throw new Error(
        `Error while getting next available book for ref=${bookRefId}`,
      );
    }
    Logger.log(
      `Found book with id=${book._id} (ref=${bookRefId}) that is available to be borrowed`,
    );
    return book;
  }

  private async updateBookOwner(
    borrowed: IBookResponse,
    userId: string,
  ): Promise<void> {
    const bookId = borrowed._id?.toHexString();
    const updated = await this.bookModel.findOneAndUpdate(
      { id: bookId },
      { owner: userId },
    );
    if (!updated) {
      throw new Error(
        `Error while updating book owner for book with id=${bookId} and userId=${userId}`,
      );
    }
    // Update user to own this book
    try {
      await this.usersClient
        .send<IUserResponse>('set_owner', { bookId: borrowed._id, userId })
        .toPromise();
      Logger.log(
        `Updated book with id=${bookId} to have new owner user=${userId}`,
      );
    } catch (error) {
      Logger.error(
        `Error while updating user's book array (userId=${userId}, bookId=${bookId}): ${
          error?.message || error
        }`,
      );
    }
  }

  private async addReturnedBookToQueue(
    bookRefId: string,
    bookId: string,
    userId: string,
  ): Promise<void> {
    Logger.log(
      `Add returned book ref=${bookRefId}, id=${bookId}, userId=${userId} to queue`,
    );
    const job = await this.returnedBooksQueue.add('return', {
      bookRefId,
      bookId,
      userId,
    });
  }
}
