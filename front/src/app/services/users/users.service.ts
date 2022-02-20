import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/types/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    const url = `${environment.apiUrl}/users`;

    return this.http.get<IUser[]>(url);
  }
}
