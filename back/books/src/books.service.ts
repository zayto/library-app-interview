import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './models/book.schema';
import { IBookRequest, IBookResponse } from './models/interfaces';
import { ReferencesService } from './references/references.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<BookDocument>,
    private bookRefsService: ReferencesService,
  ) {}


  public async getBookById(id: string): Promise<IBookResponse | null> {
    Logger.log(`GetBookById called with id ${id}`);
    return await this.findBookById(id);
  }

  // TODO: to remove? or used somewhere else?
  public async getBookByReference(ref: string): Promise<IBookResponse | null> {
    Logger.log(`GetBookByReference called with ref ${ref}`);
    return await this.findBookByRef(ref);
  }

  public async getAllBooks(): Promise<Book[]> {
    Logger.log(`GetAllBooks called`);
    return this.bookModel.find().exec();
  }

  public async createBook(book: IBookRequest): Promise<IBookResponse> {
    Logger.log(`CreateBook called with payload`, {
      book: JSON.stringify(book),
    });
    const createdBook = await this.bookModel.create(book);
    // TODO We also need to update the associated bookRef to increment counters (available/totalQuantity) and update status
    // after adding a new physical book
    return createdBook;
  }

  public async borrowBook(
    bookRefId: string,
    userId: string,
  ): Promise<IBookResponse> {
    Logger.log(
      `BorrowBook called with bookRefId=${bookRefId} and userId=${userId}`,
    );
    // Check if book exists and is available or not
    const bookRef = await this.bookRefsService.getBookReferenceById(bookRefId);

    if (!bookRef) {
      throw new Error(
        `Invalid book ref provided, ref=${bookRefId} does not exist`,
      );
    }

    // Validate if book can be borrowed and if there is still available
    try {
      await this.bookRefsService.borrowBookAndUpdateBookRef(bookRefId);
    } catch (error) {
      Logger.error(
        `Error while trying to borrow book with bookRefId=${bookRefId}, err: ${error?.message}`,
      );
    }

    // Book was available, retrieve next valid book to be borrowed, update its data and return it
    const borrowed = await this.borrowPhysicalBook(bookRefId, userId);

    return borrowed;
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
    const books = await this.bookModel.find({ reference: bookRefId });
    // Returns the first book available (with no owner)
    const availableBook = (books || []).find(
      (book) => book?.reference?.toHexString() === bookRefId && !book?.owner,
    );

    return availableBook;
  }

  private async findBookByRef(ref: string): Promise<IBookResponse> {
    // Returns the first book with matching ref
    return await this.bookModel.findOne({ reference: ref});
  }

  private async findBookById(id: string): Promise<IBookResponse> {
    return await this.bookModel.findById(id);
  }

  private async updateBookOwner(
    borrowed: IBookResponse,
    userId: string,
  ): Promise<void> {
    const bookId = borrowed._id?.toHexString();
    await this.bookModel.findOneAndUpdate({ id: bookId }, { owner: userId });
  }
}
