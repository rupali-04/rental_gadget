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
  roleAs: string = '';
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

  Auth(): Observable<any> {
    this.isLogin = true;
    return this.http.get(AUTH_API, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': this.storageServie.getUser(),
      }),
    });
  }

  register(
    username: string,
    email: string,
    role: string,
    location: string,
    password: string
  ): Observable<any> {
    this.roleAs = role;

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
    this.isLogin = false;
    this.roleAs = '';
    localStorage.setItem('STATE', 'false');
    localStorage.setItem('ROLE', '');
    return this.http.post(
      AUTH_API + 'logout',
      {},
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          //'x-auth-token': this.storageServie.getUser(),
        }),
      }
    );
  }

  IsLoggedIn() {
    const loggedIn = localStorage.getItem('STATE');
    if (loggedIn === 'true') {
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    return this.isLogin;
  }

  getRole() {
    this.roleAs = localStorage.getItem('ROLE') || '';
    return this.roleAs;
  }
}
