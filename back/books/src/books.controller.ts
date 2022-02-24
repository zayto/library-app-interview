import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BooksService } from './books.service';
import { IBookRequest, IBookResponse } from './models/interfaces';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @MessagePattern('get_book')
  async getBookById(@Payload() { id }: { id: string }): Promise<IBookResponse> {
    return await this.booksService.getBookByReference(id);
  }

  @MessagePattern('get_books')
  async getAllBooks(): Promise<IBookResponse[]> {
    return await this.booksService.getAllBooks();
  }

  @MessagePattern('create_book')
  async createBook(@Payload() book: IBookRequest): Promise<IBookResponse> {
    return await this.booksService.createBook(book);
  }

  @MessagePattern('borrow')
  async borrowBook(
    @Payload() { refId, userId }: { refId: string; userId: string },
  ): Promise<IBookResponse> {
    const book = await this.booksService.borrowBook(refId, userId);

    return book;
  }
}
