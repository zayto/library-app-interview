import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IUserResponse } from './interfaces';

@Controller()
export class AppController {
  constructor(
    @Inject('USERS')
    private readonly client: ClientProxy,
  ) {}

  @Get('users')
  async getUsers(): Promise<IUserResponse[]> {
    const users: any[] = await this.client
      .send({ cmd: 'get_users' }, {})
      .toPromise();
    return users.map((u) => ({
      ...u,
    }));
  }

  @Get('user/:id')
  async getUserById(@Param('id') id: number): Promise<IUserResponse> {
    const users = await this.client
      .send({ cmd: 'get_user' }, { id })
      .toPromise();
    return users.map((u) => ({
      ...u,
    }));
  }
}
