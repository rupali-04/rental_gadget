import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenterComponent } from './renter.component';

describe('RenterComponent', () => {
  let component: RenterComponent;
  let fixture: ComponentFixture<RenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RenterComponent]
    });
    fixture = TestBed.createComponent(RenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
