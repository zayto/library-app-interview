import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { BookRef, BookRefSchema } from '../models/book-ref.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:password@localhost/library'),
    MongooseModule.forFeature([{ name: BookRef.name, schema: BookRefSchema }]),
  ],
  controllers: [ReferencesController],
  providers: [ReferencesService]
})
export class ReferencesModule {}
