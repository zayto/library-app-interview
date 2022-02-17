import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserRequest, IUserResponse } from './models/interfaces';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('get_user')
  async getUserById(@Payload() payload: { id: string }): Promise<IUserResponse> {
    return await this.usersService.getUserById(payload.id);
  }

  @MessagePattern('get_users')
  async getAllUsers(): Promise<IUserResponse[]> {
    return await this.usersService.getAllUsers();
  }

  @MessagePattern('create_user')
  async createUser(@Payload() user: IUserRequest): Promise<IUserResponse> {
    return await this.usersService.createUser(user);
  }
}
