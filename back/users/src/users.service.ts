import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, Types } from 'mongoose';
import { IUserRequest, IUserResponse } from './models/interfaces';
import { User, UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(id: string): Promise<IUserResponse> {
    Logger.log(`GetUserById called with id ${id}`);
    const user = await this.userModel.findById<UserDocument>(id);
    return this.userToResponse(user);
  }

  async getAllUsers(): Promise<User[]> {
    Logger.log('GetAllUsers called');
    const users = await this.userModel.find().exec();
    return users.map(this.userToResponse);
  }

  async createUser(user: IUserRequest): Promise<IUserResponse> {
    Logger.log(`CreateUser called with payload`, {
      user: JSON.stringify(user),
    });
    const createdUser = await this.userModel.create(user);
    return this.userToResponse(createdUser);
  }

  async setBookOwner(
    userId: string,
    bookId: Types.ObjectId,
  ): Promise<IUserResponse> {
    const user = await this.userModel.findById<UserDocument>(userId);
    // Add bookId to array of books owned by the user
    user.books =
      user.books?.length < 1
        ? [bookId]
        : Array.from(user.books || []).concat(bookId);
    const updatedUser = await user.save();
    Logger.log(
      `Updated user (id=${userId}) to be owner of book with id=${bookId}`,
    );
    return this.userToResponse(updatedUser);
  }

  private userToResponse(user: User): IUserResponse {
    if (!user) {
      return;
    }

    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      books: user.books,
    };
  }
}
