import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

const AUTH_API = 'http://localhost:3000/api/auth/';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,private storageServie: StorageService) {}
  httpOptions: any = {}

  login(username: string, password: string, state: string): Observable<any> {

    return this.http.post(
      AUTH_API + 'user',
      {
        username,
        password,
        state,
      },

      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': this.storageServie.getUser()
        }),
      }
    );
  }

  register(
    username: string,
    email: string,
    role: string,
    location: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        role,
        location,
        password,
      },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
         // 'x-auth-token': this.storageServie.getUser()
        }),
      }
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {}, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.storageServie.getUser()
      }),
    });
  }
}
