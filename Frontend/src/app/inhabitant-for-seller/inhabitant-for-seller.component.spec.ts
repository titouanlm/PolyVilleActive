import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabitantForSellerComponent } from './inhabitant-for-seller.component';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

describe('InhabitantForSellerComponent', () => {
  let component: InhabitantForSellerComponent;
  let fixture: ComponentFixture<InhabitantForSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhabitantForSellerComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InhabitantForSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
