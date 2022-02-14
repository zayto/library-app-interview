import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRequest, IUserResponse } from './models/interfaces';
import { User, UserDocument } from './models/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserById(id: string): Promise<IUserResponse> {
    Logger.log(`GetUserById called with id ${id}`);
    const user = this.userModel.findById<UserDocument>(id);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async createUser(user: IUserRequest): Promise<IUserResponse> {
    Logger.log(`CreateUser called with payload`, {
      user: JSON.stringify(user),
    });
    const createdUser = await this.userModel.create(user);
    return createdUser;
  }
}
