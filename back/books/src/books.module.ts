import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from './models/book.schema';
import { Reference, ReferenceSchema } from './models/reference.schema';
import { ReferencesController } from './references/references.controller';
import { ReferencesService } from './references/references.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:password@localhost/library'),
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Reference.name, schema: ReferenceSchema },
    ]),
  ],
  controllers: [BooksController, ReferencesController],
  providers: [BooksService, ReferencesService],
})
export class BooksModule {}
