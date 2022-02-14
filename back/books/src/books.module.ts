import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { ReferencesModule } from './references/references.module';

@Module({
  imports: [ReferencesModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
