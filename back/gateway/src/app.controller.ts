import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  IBookRefRequest,
  IBookRefResponse,
  IBookRequest,
  IBookResponse,
  IUserRequest,
  IUserResponse,
} from './models/interfaces';

@Controller()
export class AppController {
  constructor(
    @Inject('USERS_SERVICE')
    private readonly usersClient: ClientProxy,
    @Inject('BOOKS_SERVICE')
    private readonly booksClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.usersClient.connect();
    await this.booksClient.connect();
  }

  @Get('')
  async alive(): Promise<string> {
    return 'Gateway is working!';
  }

  @Get('users')
  async getUsers(): Promise<IUserResponse[]> {
    const users: IUserResponse[] = await this.usersClient
      .send('get_users', {})
      .toPromise();

    return users;
  }

  @Get('users/:id')
  async getUserById(@Param('id') id: number): Promise<IUserResponse> {
    const user: IUserResponse = await this.usersClient
      .send('get_user', { id })
      .toPromise();

    return user;
  }

  @Post('users/create')
  async createUser(@Body() user: IUserRequest): Promise<IUserResponse> {
    const createdUser: IUserResponse = await this.usersClient
      .send('create_user', user)
      .toPromise();

    return createdUser;
  }

  @Get('books')
  async getBooks(): Promise<IBookResponse[]> {
    const books: IBookResponse[] = await this.booksClient
      .send('get_books', {})
      .toPromise();

    return books;
  }

  @Get('books/:id')
  async getBookById(@Param('id') id: number): Promise<IBookResponse> {
    const book: IBookResponse = await this.booksClient
      .send('get_book', { id })
      .toPromise();

    return book;
  }

  @Post('books/create')
  async createBook(@Body() book: IBookRequest): Promise<IBookResponse> {
    const createdBook: IBookResponse = await this.booksClient
      .send('create_book', book)
      .toPromise();

    return createdBook;
  }

  @Get('refs')
  async getBookRefs(): Promise<IBookRefResponse[]> {
    const refs: IBookRefResponse[] = await this.booksClient
      .send('get_refs', {})
      .toPromise();

    return refs;
  }

  @Get('refs/:id')
  async getRefById(@Param('id') id: number): Promise<IBookRefResponse> {
    const ref: IBookRefResponse = await this.booksClient
      .send('get_ref', { id })
      .toPromise();

    return ref;
  }

  @Post('refs/create')
  async createBookRef(
    @Body() bookRef: IBookRefRequest,
  ): Promise<IBookRefResponse> {
    const createdRef: IBookRefResponse = await this.booksClient
      .send('create_ref', bookRef)
      .toPromise();

    return createdRef;
  }

  @Post('borrow')
  async borrowBook(
    @Body() payload: { refId: string; userId: string },
  ): Promise<IBookResponse> {
    const book = await this.booksClient.send('borrow', payload).toPromise();

    return book;
  }
}
