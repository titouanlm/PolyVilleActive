import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopInformationComponent } from './shop-information.component';
import {HttpClient} from "@angular/common/http";

describe('ShopInformationComponent', () => {
  let component: ShopInformationComponent;
  let fixture: ComponentFixture<ShopInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopInformationComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
