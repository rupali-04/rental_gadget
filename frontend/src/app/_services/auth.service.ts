import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:3000/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': 'authToken',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string, state: string): Observable<any> {

    return this.http.post(
      AUTH_API + 'user',
      {
        username,
        password,
        state,
      },

      httpOptions
    );
  }

  register(
    username: string,
    email: string,
    role: string,
    password: string
  ): Observable<any> {
    return this.http.post(
      AUTH_API + 'register',
      {
        username,
        email,
        role,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'logout', {}, httpOptions);
  }
}
