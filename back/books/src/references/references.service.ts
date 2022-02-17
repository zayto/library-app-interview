import { Injectable, Logger } from '@nestjs/common';
import { Types } from 'mongoose';
import {
  BookRefStatusEnum,
  IBookRefRequest,
  IBookRefResponse,
} from 'src/models/interfaces';

@Injectable()
export class ReferencesService {
  // TODO Add mongoose model and use mongoose connection/operations to replace dummy data

  // Dummy data for array of real books that represent the library's collection
  private refs: IBookRefResponse[] = [
    {
      _id: new Types.ObjectId('6209880b6f43a7e034c81001'),
      author: 'John Snow 1',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      _id: new Types.ObjectId('6209880b6f43a7e034c81002'),
      author: 'John Snow 2',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      _id: new Types.ObjectId('6209880b6f43a7e034c81003'),
      author: 'John Snow 3',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      _id: new Types.ObjectId('6209880b6f43a7e034c81004'),
      author: 'John Snow 4',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      _id: new Types.ObjectId('6209880b6f43a7e034c81005'),
      author: 'John Snow 5',
      title: 'Beyond the Wall',
      available: 5,
      totalQuantity: 5,
      status: BookRefStatusEnum.AVAILABLE,
      excerpt:
        "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
  ];

  public async getBookReferenceById(
    id: string,
  ): Promise<IBookRefResponse | null> {
    Logger.log(`GetBookReferenceById called with id ${id}`);
    return await this.findBookRefById(id);
  }

  public async createBookRef(book: IBookRefRequest): Promise<IBookRefResponse> {
    // TODO create book in db and return it
    Logger.log(`CreateBook called with payload`, {
      book: JSON.stringify(book),
    });

    const createdBookRef = {
      _id: new Types.ObjectId(`6209880b6f43a7e034c810${this.refs.length + 1}`),
      ...book,
      available: 1,
      totalQuantity: 1,
    };
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
    return (this.refs || []).find(
      (bookRef) => bookRef?._id?.toHexString() === id,
    );
  }
}
