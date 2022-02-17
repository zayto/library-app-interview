import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './models/book.schema';
import { BookStatusEnum, IBookResponse } from './models/interfaces';
import { ReferencesService } from './references/references.service';

describe('BooksController', () => {
  let booksController: BooksController;
  let model: Model<Book>;

  const mockBook: IBookResponse = {
    _id: new Types.ObjectId('6209880b6f43a7e034c84943'),
    reference: new Types.ObjectId('6209880b6f43a7e034c84942'),
    status: BookStatusEnum.AVAILABLE,
    owner: null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        ReferencesService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook),
            constructor: jest.fn().mockResolvedValue(mockBook),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    // let booksService = module.get<BooksService>(BooksService);
    // let referencesService = module.get<ReferencesService>(ReferencesService);
    model = module.get<Model<Book>>(getModelToken('Book'));


    booksController = module.get<BooksController>(BooksController);
  });

  describe('root', () => {
    it('should return all books', async () => {
      // TODO: Fix this test, need to properly mock the mongoose find/exec calls
      // const books = await booksController.getAllBooks();
      // expect(books).toMatchSnapshot();
    });
  });
});
