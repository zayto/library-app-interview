import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/types/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  constructor(private http: HttpClient) {}

  getBookRefs(): Observable<IBook[]> {
    const url = `${environment.apiUrl}/refs`;

    return this.http.get<IBook[]>(url);
  }
}
