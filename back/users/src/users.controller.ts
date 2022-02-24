import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserRequest, IUserResponse } from './models/interfaces';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { isValidObjectId, Types } from 'mongoose';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get_user')
  async getUserById(@Payload() { id }: { id: string }): Promise<IUserResponse> {
    if (!isValidObjectId(id)) {
      throw new Error(
        `Error while getting user with id=${id}: invalid id provided`,
      );
    }
    return await this.usersService.getUserById(id);
  }

  @MessagePattern('get_users')
  async getAllUsers(): Promise<IUserResponse[]> {
    return await this.usersService.getAllUsers();
  }

  @MessagePattern('create_user')
  async createUser(@Payload() user: IUserRequest): Promise<IUserResponse> {
    return await this.usersService.createUser(user);
  }

  @MessagePattern('set_owner')
  async setBookOwner(
    @Payload() { userId, bookId }: { userId: string; bookId: Types.ObjectId },
  ): Promise<IUserResponse> {
    return await this.usersService.setBookOwner(userId, bookId);
  }
}
