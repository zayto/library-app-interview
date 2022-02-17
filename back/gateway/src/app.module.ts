import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      { name: 'USERS_SERVICE', transport: Transport.REDIS },
      { name: 'BOOKS_SERVICE', transport: Transport.REDIS },
    ])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
