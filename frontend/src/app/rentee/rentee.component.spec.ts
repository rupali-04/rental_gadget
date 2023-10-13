import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenteeComponent } from './rentee.component';

describe('RenteeComponent', () => {
  let component: RenteeComponent;
  let fixture: ComponentFixture<RenteeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenteeComponent]
    });
    fixture = TestBed.createComponent(RenteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
