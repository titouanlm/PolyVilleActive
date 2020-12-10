import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSellerAuthenticationComponent } from './popup-seller-authentication.component';

describe('PopupSellerAuthenticationComponent', () => {
  let component: PopupSellerAuthenticationComponent;
  let fixture: ComponentFixture<PopupSellerAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSellerAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSellerAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
