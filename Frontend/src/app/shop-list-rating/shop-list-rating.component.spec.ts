import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopListRatingComponent } from './shop-list-rating.component';
import {HttpClient} from "@angular/common/http";

describe('ShopRatingComponent', () => {
  let component: ShopListRatingComponent;
  let fixture: ComponentFixture<ShopListRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopListRatingComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopListRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
