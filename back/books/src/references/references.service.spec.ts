import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, Types } from 'mongoose';
import { BookRefStatusEnum, IBookRefResponse } from '../models/interfaces';
import { Reference } from '../models/reference.schema';
import { ReferencesService } from './references.service';

describe('ReferencesService', () => {
  let refService: ReferencesService;
  let model: Model<Reference>;

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
      providers: [
        ReferencesService,
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

    model = module.get<Model<Reference>>(getModelToken('Reference'));
    refService = module.get<ReferencesService>(ReferencesService);
  });

  it('should be defined', () => {
    expect(refService).toBeDefined();
  });

  it('should return all bookRefs', async () => {
    const refs = await refService.getAllBooksRefs();
    expect(refs).toMatchSnapshot();
  });
});
