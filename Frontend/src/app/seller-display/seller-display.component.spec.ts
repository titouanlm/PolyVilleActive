import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDisplayComponent } from './seller-display.component';
import {HttpClient} from "@angular/common/http";

describe('SellerDisplayComponent', () => {
  let component: SellerDisplayComponent;
  let fixture: ComponentFixture<SellerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDisplayComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
