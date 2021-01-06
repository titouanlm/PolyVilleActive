import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSellerAuthenticationComponent } from './popup-seller-authentication.component';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

describe('PopupSellerAuthenticationComponent', () => {
  let component: PopupSellerAuthenticationComponent;
  let fixture: ComponentFixture<PopupSellerAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSellerAuthenticationComponent ],
      providers: [{provide: MatDialogRef, useValue: {}},{provide: Router, useValue: {}},{provide: HttpClient, useValue: {}}]
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
