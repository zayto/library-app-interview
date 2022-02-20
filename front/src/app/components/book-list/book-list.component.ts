import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books/books.service';
import { IBook } from 'src/app/types/interfaces';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  public books: IBook[] = [];

  constructor(private booksService: BooksService) {}

  ngOnInit(): void {
    // Retrieve first 20 books to display an overview of the library collection
    // (could be improved with a paginator component etc)
    try {
      this.booksService.getBookRefs().subscribe((books) => {
        this.books = books;
      });
    } catch (e) {
      // TODO: Could display a toast or an error in the layout to explain that there was an error with the books retrieval
    }
  }
}
