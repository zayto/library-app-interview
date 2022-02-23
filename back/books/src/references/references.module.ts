import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReferencesController } from './references.controller';
import { ReferencesService } from './references.service';
import { BookRef, BookRefSchema } from '../models/book-ref.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://user:password@${process.env.MONGO_HOST}/library`,
    ),
    MongooseModule.forFeature([{ name: BookRef.name, schema: BookRefSchema }]),
  ],
  controllers: [ReferencesController],
  providers: [ReferencesService],
  exports: [MongooseModule],
})
export class ReferencesModule {}
