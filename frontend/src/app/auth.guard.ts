import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
  UrlTree,
  Route,
  UrlSegment,
} from '@angular/router';
import { AuthService } from './_services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
// CanActivateChild,
// CanDeactivate
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }
  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authService.IsLoggedIn()) {
      const userRole = this.authService.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
        this.router.navigate(['/renter']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/renter']);
    return false;
  }
}
