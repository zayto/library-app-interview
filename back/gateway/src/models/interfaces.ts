import { Types } from 'mongoose';

// TODO: Find a way to retrieve the interfaces directly from each microservice to avoid duplication

/**
 * Users
 */
export interface IUserRequest {
  firstName: string;
  lastName: string;
}

export interface IUserResponse {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  books: string[];
}

/**
 * Books
 */
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

export enum BookStatusEnum {
  AVAILABLE = 'AVAILABLE',
  BORROWED = 'BORROWED',
  IN_TRANSIT = 'IN_TRANSIT',
  TO_BE_PICKED = 'TO_BE_PICKED',
  DAMAGED = 'DAMAGED',
  LOST = 'LOST',
}

/**
 * BookRefs
 */
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

export enum BookRefStatusEnum {
  AVAILABLE = 'AVAILABLE',
  TO_ORDER_BACK = 'TO_ORDER_BACK',
  UNAVAILABLE = 'UNAVAILABLE',
}

