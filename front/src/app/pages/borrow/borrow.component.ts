import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books/books.service';
import { UsersService } from 'src/app/services/users/users.service';
import { IBook, IUser } from 'src/app/types/interfaces';

@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css'],
})
export class BorrowComponent implements OnInit {
  public books: IBook[] = [];
  public users: IUser[] = [];

  public form: FormGroup;

  constructor(
    private booksService: BooksService,
    private usersService: UsersService
  ) {
    this.form = new FormGroup({
      user: new FormControl(null, [Validators.required]),
      book: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => {
      this.users = users;
    });
    this.refreshBooks();
  }

  onSubmit(): void {
    console.warn('Your book request has been submitted', this.form.value);
    // Submit book to be borrowed and display status message
    this.booksService.borrowBook('id', 'userId').subscribe((borrowed) => {
      console.log(borrowed);
    });

    this.form.reset();
  }

  private refreshBooks() {
    this.booksService.getBookRefs().subscribe((books) => {
      this.books = books;
    });
  }
}
