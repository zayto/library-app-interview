import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IUserRequest, IUserResponse } from './models/interfaces';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/users/:id')
  async getUserById(@Param('id') id: string): Promise<IUserResponse> {
    // TODO Retrieve user data from db
    return await this.usersService.getUserById(id);
  }

  @Post('/users/create')
  async create(@Body() user: IUserRequest): Promise<IUserResponse> {
    return await this.usersService.createUser(user);
  }
}
