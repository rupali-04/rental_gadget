import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-renter',
  templateUrl: './renter.component.html',
  styleUrls: ['./renter.component.css'],
})
export class RenterComponent implements OnInit {
  addProduct: any = {
    title: null,
    description: null,
    gadgetType: null,
    brand: null,
    gadgetModel: null,
    specification: null,
    serialNumber: null,
    securityDeposit: null,
    rentalRate: null,
    gadgetLocation: null,
  };

  addCoupon: any = {
    couponCode: null,
    discount: null,
    expiryDate: null,
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
