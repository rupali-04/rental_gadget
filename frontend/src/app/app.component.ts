import { Component } from '@angular/core';
import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private roles: string[] = [];
  status = this.authService.isLoggedIn;
  showAdminBoard = false;
  showRenterBoard = false;
  username?: string;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOninit(): void {
    this.authService.isLoggedIn = this.storageService.isLoggedIn();

    if (this.authService.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('Admin');
      this.showRenterBoard = this.roles.includes('Renter');

      this.username = user.username;
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
