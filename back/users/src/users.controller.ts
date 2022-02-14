import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserRequest, IUserResponse } from './models/interfaces';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users/:id')
  async getUserById(@Param('id') id: string): Promise<IUserResponse> {
    return await this.usersService.getUserById(id);
  }

  @Get('/users')
  async getAllUsers(): Promise<IUserResponse[]> {
    return await this.usersService.getAllUsers();
  }

  @Post('/users/create')
  async create(@Body() user: IUserRequest): Promise<IUserResponse> {
    return await this.usersService.createUser(user);
  }
}
