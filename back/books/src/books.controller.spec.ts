import { BullModule } from '@nestjs/bull';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book } from './models/book.schema';
import {
  BookRefStatusEnum,
  BookStatusEnum,
  IBookRefResponse,
  IBookResponse,
} from './models/interfaces';
import { Reference } from './models/reference.schema';
import { ReferencesService } from './references/references.service';

describe('BooksController', () => {
  let booksController: BooksController;
  let bookModel: Model<Book>;
  let refModel: Model<Reference>;

  const mockBook: IBookResponse = {
    _id: new Types.ObjectId('6209880b6f43a7e034c84941'),
    reference: new Types.ObjectId('6209880b6f43a7e034c84943'),
    status: BookStatusEnum.AVAILABLE,
    owner: null,
  };

  const mockRef: IBookRefResponse = {
    _id: new Types.ObjectId('6209880b6f43a7e034c84943'),
    author: 'Author',
    title: 'Title',
    excerpt: 'Excerpt',
    available: 1,
    totalQuantity: 1,
    status: BookRefStatusEnum.AVAILABLE,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          { name: 'USERS_SERVICE', transport: Transport.REDIS },
        ]),
        BullModule.registerQueue({
          name: 'returnedBooks',
        }),
      ],
      controllers: [BooksController],
      providers: [
        BooksService,
        ReferencesService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook),
            constructor: jest.fn().mockResolvedValue(mockBook),
            find: jest.fn().mockReturnValue({ exec: () => [mockBook] }),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
        {
          provide: getModelToken(Reference.name),
          useValue: {
            new: jest.fn().mockResolvedValue(mockRef),
            constructor: jest.fn().mockResolvedValue(mockRef),
            find: jest.fn().mockReturnValue({ exec: () => [mockRef] }),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    bookModel = module.get<Model<Book>>(getModelToken('Book'));
    refModel = module.get<Model<Reference>>(getModelToken('Reference'));

    booksController = module.get<BooksController>(BooksController);
  });

  describe('root', () => {
    it('should return all books', async () => {
      // TODO: Fix this test, need to properly mock the mongoose find/exec calls
      const books = await booksController.getAllBooks();
      expect(books).toMatchSnapshot();
    });
  });
});
