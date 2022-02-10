import { Injectable } from '@nestjs/common';
import { IUserRequest, IUserResponse } from './models/interfaces';

@Injectable()
export class UsersService {
  private users: IUserResponse[] = [
    { id: 0, firstName: 'John', lastName: 'Doe', books: [] },
    { id: 1, firstName: 'Jane', lastName: 'Doe', books: [] },
    { id: 2, firstName: 'Bob', lastName: 'Doe', books: [] },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  async getUserById(id: number): Promise<IUserResponse> {
    console.log(`GetUserById called with id ${id}`);
    // TODO Retrieve user from db
    const user = this.users?.find((user) => user?.id === id);
    // Return user or some "default not found user"
    return user || { id: -1, firstName: 'N/A', lastName: 'N/A', books: [] };
  }

  async createUser(user: IUserRequest): Promise<void> {
    // TODO createUser in db
    console.log(`CreateUser called with payload`, {
      user: JSON.stringify(user),
    });
    return;
  }
}
