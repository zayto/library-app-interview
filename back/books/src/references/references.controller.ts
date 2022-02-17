import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { IBookRefRequest, IBookRefResponse } from '../models/interfaces';
import { ReferencesService } from './references.service';

@Controller()
export class ReferencesController {
  constructor(private readonly bookRefsService: ReferencesService) {}

  @MessagePattern('get_ref')
  async getBookRefById(@Payload() payload: { id: string }): Promise<IBookRefResponse> {
    return await this.bookRefsService.getBookReferenceById(payload.id);
  }

  @MessagePattern('get_refs')
  async getAllBooks(): Promise<IBookRefResponse[]> {
    return await this.bookRefsService.getAllBooksRefs();
  }

  @MessagePattern('create_ref')
  async createBook(@Payload() bookRef: IBookRefRequest): Promise<IBookRefResponse> {
    return await this.bookRefsService.createBookRef(bookRef);
  }
}
