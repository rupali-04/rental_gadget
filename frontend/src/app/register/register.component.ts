import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    email: null,
    role: null,
    password: null,
    location: null,
  };
  isSuccessful: boolean = false;
  isSignUpFailed: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private storageServie: StorageService
  ) {}

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    const { username, email, role, location, password } = this.form;

    if (!role) {
      this.errorMessage = 'Role is required';
      this.isSignUpFailed = true;
      return;
    }

    this.authService
      .register(username, email, role, location, password)
      .subscribe({
        next: (data) => {
          console.log(data);
          // Add API Key to Session Storage
          this.storageServie.saveUser(data.token);
          this.isSuccessful = true;
          this.isSignUpFailed = data.success === false;
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        },
      });
  }
}
