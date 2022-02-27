import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  BookRefStatusEnum,
  IBookRefRequest,
  IBookRefResponse,
} from '../models/interfaces';
import { Reference, ReferenceDocument } from '../models/reference.schema';

@Injectable()
export class ReferencesService {
  constructor(
    @InjectModel(Reference.name) private refModel: Model<ReferenceDocument>,
  ) {}

  public async getBookReferenceById(
    refId: string,
  ): Promise<IBookRefResponse | null> {
    Logger.log(`GetBookReferenceById called with id=${refId}`);
    return await this.refModel.findById<IBookRefResponse>(refId);
  }

  public async getAllBooksRefs(): Promise<IBookRefResponse[]> {
    Logger.log('GetAllBookRefs called');
    return this.refModel.find().exec();
  }

  public async createBookRef(
    bookRef: IBookRefRequest,
  ): Promise<IBookRefResponse> {
    Logger.log(`CreateBookRef called with payload`, {
      bookRef: JSON.stringify(bookRef),
    });

    const createdBookRef = await this.refModel.create({
      ...bookRef,
      available: 0,
      totalQuantity: 0,
      status: BookRefStatusEnum.TO_ORDER_BACK, // Represents a new entry but with 0 quantity, we should order some books
    });
    return createdBookRef;
  }

  public async borrowBookAndUpdateBookRef(
    bookRef: IBookRefResponse,
  ): Promise<void> {
    const { _id: bookRefId } = bookRef;
    if (!this.isBookRefAvailable(bookRef)) {
      throw new Error(
        `Book with ref=${bookRefId} is not available to be borrowed`,
      );
    }

    const refToUpdate: Partial<IBookRefResponse> = {
      title: bookRef.title,
      author: bookRef.author,
      excerpt: bookRef.excerpt,
      status:
        bookRef.available > 0
          ? BookRefStatusEnum.AVAILABLE
          : BookRefStatusEnum.UNAVAILABLE,
      available: bookRef.available - 1,
    };
    // Update availability status and quantity after borrowing
    await this.refModel.findOneAndUpdate(bookRefId, refToUpdate);
  }

  public async addNewBookQuantity(
    bookRefId: string,
    quantity: number,
  ): Promise<IBookRefResponse> {
    if (quantity <= 0) {
      throw new Error(
        `Invalid quantity provided (quantity=${quantity}) to add for bookRef with id=${bookRefId}`,
      );
    }
    const bookRef = await this.refModel.findById(bookRefId, null);
    bookRef.available += quantity;
    bookRef.totalQuantity += quantity;
    if (bookRef.available > 0) {
      bookRef.status = BookRefStatusEnum.AVAILABLE;
    }
    const updated = await bookRef.save();
    Logger.log(
      `Added quantity ${quantity} to ref with id=${bookRefId}, new availableQuantity=${updated.available}, new totalQuantity=${updated.totalQuantity}`,
    );

    return updated;
  }

  private isBookRefAvailable(bookRef: IBookRefResponse): boolean {
    return (
      bookRef.available > 0 && BookRefStatusEnum.AVAILABLE === bookRef.status
    );
  }
}
