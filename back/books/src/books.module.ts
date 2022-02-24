import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './models/book.schema';
import { Reference, ReferenceSchema } from './models/reference.schema';
import { ReferencesController } from './references/references.controller';
import { ReferencesService } from './references/references.service';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://user:password@${process.env.MONGO_HOST}/library`,
    ),
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.REDIS,
        options: { url: `redis://${process.env.REDIS_HOST}:6379` },
      },
    ]),
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Reference.name, schema: ReferenceSchema },
    ]),
  ],
  controllers: [BooksController, ReferencesController],
  providers: [BooksService, ReferencesService],
})
export class BooksModule {}
