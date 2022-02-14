import { Injectable, Logger } from '@nestjs/common';
import { BookStatusEnum, IBookRequest, IBookResponse } from './models/interfaces';
import { ReferencesService } from './references/references.service';

@Injectable()
export class BooksService {
  // Dummy data for array of real books that represent the library's collection
  private books: IBookResponse[] = [
    { id: 0, reference: 1, status: BookStatusEnum.AVAILABLE, owner: null },
    { id: 1, reference: 1, status: BookStatusEnum.AVAILABLE, owner: null },
    { id: 2, reference: 2, status: BookStatusEnum.AVAILABLE, owner: null },
    { id: 3, reference: 2, status: BookStatusEnum.AVAILABLE, owner: null },
    { id: 4, reference: 3, status: BookStatusEnum.AVAILABLE, owner: null },
    { id: 5, reference: 3, status: BookStatusEnum.AVAILABLE, owner: null },
    { id: 6, reference: 4, status: BookStatusEnum.AVAILABLE, owner: null },
  ];

  constructor(private bookRefsService: ReferencesService) {}

  public async getBookByReference(ref: string): Promise<IBookResponse | null> {
    Logger.log(`GetBookByReference called with ref ${ref}`);
    // TODO Retrieve book from db
    return await this.findBookByRef(ref);
  }

  public async createBook(book: IBookRequest): Promise<IBookResponse> {
    // TODO create book in db
    console.log(`CreateBook called with payload`, {
      book: JSON.stringify(book),
    });
    // TODO We also need to update the associated bookRef to increment counters (available/totalQuantity) and update status
    // after adding a new physical book
    return;
  }

  public async borrowBook(bookRefId: string, userId: string): Promise<IBookResponse> {
    // Check if book exists and is available or not
    // TODO Find a way to inject the 
    const bookRef = await this.bookRefsService.getBookReferenceById(bookRefId);

    if (!bookRef) {
      throw new Error(`Invalid book ref provided, ref=${bookRefId} does not exist`);
    }

    // Validate if book can be borrowed and if there is still available
    try {
      await this.bookRefsService.borrowBookAndUpdateBookRef(bookRefId);
    } catch (error) {
      Logger.error(`Error while trying to borrow book with bookRefId=${bookRefId}, err: ${error?.message}`);
    }

    // Book was available, retrieve next valid book to be borrowed, update its data and return it
    const borrowed = await this.borrowPhysicalBook(bookRefId, userId);

    return borrowed;
  }

  private async borrowPhysicalBook(bookRefId: string, userId: string): Promise<IBookResponse> {
    const borrowed = await this.getNextBookToBorrow(bookRefId);

    // TODO Update borrowed book owner with userId
    await this.updateBookOwner(borrowed, userId);

    return borrowed;
  }

  private async getNextBookToBorrow(bookRefId: string): Promise<IBookResponse> {
    const availableBook = this.books.find(book => book?.reference === bookRefId && !book?.owner);

    return availableBook;
  }

  private async findBookByRef(ref: string): Promise<IBookResponse | null> {
    return (this.books || []).find((book) => book?.reference === ref) || null;
  }

  private async updateBookOwner(borrowed: IBookResponse, userId: string): Promise<void> {
    const bookId = borrowed.id;
    
    // TODO Update book in database based on id
    


  }
}
