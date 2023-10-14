import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.css'],
})
export class RenterComponent implements OnInit {
  form: any = {
    title: null,
    description: null,
    available: null,
    photoGalary: null,
    gadgetType: null,
    brand: null,
    gadgetModel: null,
    specification: null,
    serialNumber: null,
    fromAvailableDate: null,
    toAvailableDate: null,
    securityDeposit: null,
    rentalRate: null,
    gadgetLocation: null,
    userDetails: null,
    discountCoupon: null,
    date: Date.now(),
  };

  errorMessage: string = '';
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private storageServie: StorageService
  ) {}

  ngOnInit(): void {
    console.log(this.storageServie.getUser());
    const userRoles = this.storageServie.getUser().roles;
    if (userRoles.includes('Renter')) {
    }
  }
}
