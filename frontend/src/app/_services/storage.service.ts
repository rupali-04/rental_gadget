import { Injectable } from '@angular/core';

const USER_TOKEN_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_TOKEN_KEY);
    window.sessionStorage.setItem(USER_TOKEN_KEY, JSON.stringify(user));

  }

  public saveRole(role: any): void {
    window.sessionStorage.removeItem('role');
    window.sessionStorage.setItem('role', JSON.stringify(role));

  }

  

  public getUser(): any {
    console.log(window.sessionStorage.getItem(USER_TOKEN_KEY));
    const user = window.sessionStorage.getItem(USER_TOKEN_KEY);
    if (user != null) {
      return JSON.parse(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_TOKEN_KEY);
    if (user) {
      return true;
    }

    return false;
  }
}
