import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRatingComponent } from './shop-rating.component';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

describe('ShopRatingComponent', () => {
  let component: ShopRatingComponent;
  let fixture: ComponentFixture<ShopRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopRatingComponent ],
      providers: [{provide: MatDialogRef, useValue: {}},{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
