import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { IBookRequest, IBookResponse } from './models/interfaces';

@Controller()
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getHello(): string {
    return this.booksService.getHello();
  }

  @Get('/users/:id')
  async getUserById(@Param('id') id: number): Promise<IBookResponse> {
    // TODO Retrieve book data from db
    return await this.booksService.getBookById(id);
  }

  @Post('/books/create')
  async create(@Body() book: IBookRequest): Promise<void> {
    return await this.booksService.createBook(book);
  }
}
