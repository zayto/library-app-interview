import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books/books.service';
import { IBook } from 'src/app/types/interfaces';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css'],
})
export class BorrowComponent implements OnInit {
  public searchResults: IBook[] = [];
  public formGroup: FormGroup;
  public formTitle: FormControl;

  constructor(private booksService: BooksService) {
    this.formTitle = new FormControl(null, [Validators.required]);
    this.formGroup = new FormGroup({ title: this.formTitle });
  }

  async ngOnInit(): Promise<void> {
    this.searchResults = await this.booksService.getBooksOverview(); 
  }

  async onSearch($event: any): Promise<void> {
    // Update the book options based on search results

    // TODO Query books based on search query instead of default list
    const books = await this.booksService.getBooksOverview();
    this.searchResults = books;
  }
}
