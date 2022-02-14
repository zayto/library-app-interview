import { Injectable } from '@nestjs/common';
import { BookRefStatusEnum, IBookRefRequest, IBookRefResponse } from 'src/models/interfaces';

@Injectable()
export class ReferencesService {
  // Dummy data for array of real books that represent the library's collection
  private refs: IBookRefResponse[] = [
    {
      id: '1',
      author: 'John Snow 1',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      id: '2',
      author: 'John Snow 2',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      id: '3',
      author: 'John Snow 3',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      id: '4',
      author: 'John Snow 4',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      id: '5',
      author: 'John Snow 5',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
  ];

  getHello(): string {
    return 'Hello World!';
  }

  async getBookReferenceById(id: string): Promise<IBookRefResponse | null> {
    console.log(`GetBookReferenceById called with id ${id}`);
    // TODO Retrieve book ref from db
    return await this.findBookRefById(id);
  }

  async createBookRef(book: IBookRefRequest): Promise<IBookRefResponse> {
    // TODO create book in db and return it
    console.log(`CreateBook called with payload`, {
      book: JSON.stringify(book),
    });
    return;
  }

  async isBookAvailable(id: string): Promise<boolean> {
    const bookRef = await this.findBookRefById(id);
    if (!bookRef) {
      return false;
    }
    // With proper unit testing, we will keep the status value updated and true so we can only check the status
    // We could also ensure available > 0 and totalQuantity > 0.
    return bookRef.status === BookRefStatusEnum.AVAILABLE;
  }

  async borrowBookAndUpdateBookRef(id: string): Promise<void> {
    // Check if book is available to be borrowed
    const isAvailable = await this.isBookAvailable(id);
    if (!isAvailable) {
      throw new Error(`Book with id=${id} can't be borrowed`);
    }
    const bookRef = await this.findBookRefById(id);

    // Update availability status and quantity after borrowing
    bookRef.available -= 1;
    bookRef.status = (bookRef.available > 0) ? BookRefStatusEnum.AVAILABLE : BookRefStatusEnum.UNAVAILABLE;
  }

  private async findBookRefById(id: string): Promise<IBookRefResponse | null> {
    return (this.refs || []).find((bookRef) => bookRef?.id === id) || null;
  }
}
