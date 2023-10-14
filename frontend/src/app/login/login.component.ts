import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    location: null,
  };

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageServie: StorageService
  ) {}

  ngOnInit(): void {
    console.log(this.storageServie.getUser());
    if (this.storageServie.getUser() != null) {
      this.isLoggedIn = true;
      this.roles = this.storageServie.getUser().roles;
    }
    console.log('isLoggedIn', this.isLoggedIn);
  }

  onSubmit(): void {
    const { username, password, location } = this.form;

    this.authService.login(username, password, location).subscribe({
      next: (data) => {
        this.storageServie.saveUser(data);

        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.roles = this.storageServie.getUser().roles;
        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
