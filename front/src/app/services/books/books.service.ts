import { Injectable } from '@angular/core';
import { IBook } from 'src/app/types/interfaces';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private tmpBooks: IBook[] = [
    {
      id: "1",
      author: "John Snow",
      title: "Beyond the Wall",
      excerpt: "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      id: "2",
      author: "John Snow",
      title: "Beyond the Wall 2",
      excerpt: "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      id: "3",
      author: "John Snow",
      title: "Beyond the Wall 3",
      excerpt: "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      id: "4",
      author: "John Snow",
      title: "Beyond the Wall 4",
      excerpt: "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
    {
      id: "5",
      author: "John Snow",
      title: "Beyond the Wall 5",
      excerpt: "Night gathers, and now my watch begins. It shall not end until my death. I shall take no wife, hold no lands, father no children. I shall wear no crowns and win no glory. I shall live and die at my post. I am the sword in the darkness. I am the watcher on the walls. I am the shield that guards the realms of men. I pledge my life and honor to the Night's Watch, for this night and all the nights to come. ―The Night's Watch oath",
    },
  ];

  constructor() { }

  async getBooksOverview(): Promise<IBook[]> {
    // TODO Retrieve 20 books from database collection
    return this.tmpBooks;
  }
}
