import { Model, Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getModelToken } from '@nestjs/mongoose';
import { User } from './models/user.schema';
import { IUserResponse } from './models/interfaces';

describe('UsersService', () => {
  let service: UsersService;
  let model: Model<User>;

  const mockUser = {
    _id: new Types.ObjectId('6209880b6f43a7e034c84943'),
    firstName: 'FirstName',
    lastName: 'LasttName',
    books: [],
  };

  const mockUser2 = {
    _id: new Types.ObjectId('6209880b6f43a7e034c84944'),
    firstName: 'FirstName2',
    lastName: 'LasttName2',
    books: [],
  };

  const usersArray = [mockUser, mockUser2];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('User'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockUser),
            constructor: jest.fn().mockResolvedValue(mockUser),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<Model<User>>(getModelToken('User'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', async () => {
    jest.spyOn(model, 'find').mockReturnValue({
      exec: jest.fn().mockResolvedValueOnce(usersArray),
    } as any);
    const users = await service.getAllUsers();
    expect(users).toEqual(usersArray);
  });

  it('should insert a new user', async () => {
    jest
      .spyOn(model, 'create')
      .mockImplementationOnce(() => Promise.resolve<IUserResponse>(mockUser));
    const newUser = await service.createUser({
      firstName: 'FirstName',
      lastName: 'LastName',
    });
    expect(newUser).toEqual(mockUser);
  });
});
