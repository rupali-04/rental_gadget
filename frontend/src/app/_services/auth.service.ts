import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';

const AUTH_API = 'http://localhost:3000/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLogin: boolean = false;
  role: string = '';
  isLoggedIn = false;
  httpOptions: any = {};

  constructor(
    private http: HttpClient,
    private storageServie: StorageService
  ) {}

  login(username: string, password: string, location: string): Observable<any> {
    this.isLogin = true;
    return this.http.post(
      AUTH_API + 'user',
      {
        email: username,
        password,
        location,
      },

      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //  'x-auth-token': this.storageServie.getUser(),
        }),
      }
    );
  }

  AuthService(): Observable<any> {
    this.isLogin = true;
    return this.http.post(
      AUTH_API + 'user',
      {},

      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //  'x-auth-token': this.storageServie.getUser(),
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
    this.role = role;

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
    return this.http.post(
      AUTH_API + 'logout',
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': this.storageServie.getUser(),
        }),
      }
    );
  }
}
