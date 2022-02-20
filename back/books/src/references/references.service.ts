import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BookRefStatusEnum,
  IBookRefRequest,
  IBookRefResponse,
} from 'src/models/interfaces';
import { Reference, ReferenceDocument } from 'src/models/reference.schema';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectModel(Reference.name) private refModel: Model<ReferenceDocument>,
  ) {}

  private refs: IBookRefResponse[] = [];

  public async getBookReferenceById(
    id: string,
  ): Promise<IBookRefResponse | null> {
    Logger.log(`GetBookReferenceById called with id ${id}`);
    return await this.findBookRefById(id);
  }

  public async getAllBooksRefs(): Promise<IBookRefResponse[]> {
    Logger.log('GetAllBookRefs called');
    return this.refModel.find().exec();
  }

  public async createBookRef(
    bookRef: IBookRefRequest,
  ): Promise<IBookRefResponse> {
    Logger.log(`CreateBookRef called with payload`, {
      user: JSON.stringify(bookRef),
    });

    const createdBookRef = await this.refModel.create({
      ...bookRef,
      available: 1,
      totalQuantity: 1,
    });
    this.refs.push(createdBookRef);
    return createdBookRef;
  }

  public async isBookAvailable(id: string): Promise<boolean> {
    const bookRef = await this.findBookRefById(id);
    if (!bookRef) {
      return false;
    }
    // With proper unit testing, we will keep the status value updated and true so we can only check the status
    // We could also ensure available > 0 and totalQuantity > 0.
    return bookRef.status === BookRefStatusEnum.AVAILABLE;
  }

  public async borrowBookAndUpdateBookRef(id: string): Promise<void> {
    // Check if book is available to be borrowed
    const isAvailable = await this.isBookAvailable(id);
    if (!isAvailable) {
      throw new Error(`Book with id=${id} can't be borrowed`);
    }
    const bookRef = await this.findBookRefById(id);

    // Update availability status and quantity after borrowing
    bookRef.available -= 1;
    bookRef.status =
      bookRef.available > 0
        ? BookRefStatusEnum.AVAILABLE
        : BookRefStatusEnum.UNAVAILABLE;
  }

  private async findBookRefById(id: string): Promise<IBookRefResponse> {
    const bookRef = await this.refModel.findById<IBookRefResponse>(id);
    return bookRef;
  }
}
