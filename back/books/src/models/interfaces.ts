import { Types } from "mongoose";

export enum BookStatusEnum {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
  IN_TRANSIT = 'IN_TRANSIT',
  TO_BE_PICKED = 'TO_BE_PICKED',
  DAMAGED = 'DAMAGED',
  LOST = 'LOST'
}

export enum BookRefStatusEnum {
  AVAILABLE = 'AVAILABLE',
  TO_ORDER_BACK = 'TO_ORDER_BACK',
  UNAVAILABLE = 'UNAVAILABLE',
}

export interface IBookRequest {
  reference: string;
  status: BookStatusEnum;
}

export interface IBookResponse {
  _id: Types.ObjectId;
  reference: Types.ObjectId; // A reference to the actual book (bookRefs collection)
  status: BookStatusEnum;
  owner: Types.ObjectId; // A reference to the User who currently owns the book (users collection)
}

export interface IBookRefRequest {
  title: string;
  author: string;
  excerpt: string;
  status: BookRefStatusEnum;
  quantity: number;
}

export interface IBookRefResponse {
  _id: Types.ObjectId;
  title: string;
  author: string;
  excerpt: string;
  status: BookRefStatusEnum;
  available: number; // Quantity available in the shelves
  totalQuantity: number; // Total quantity owned by the library for this reference
}
