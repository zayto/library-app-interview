import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.REDIS,
        options: { url: `redis://${process.env.REDIS_HOST}:6379` },
      },
      {
        name: 'BOOKS_SERVICE',
        transport: Transport.REDIS,
        options: { url: `redis://${process.env.REDIS_HOST}:6379` },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
