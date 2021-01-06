import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalShopInfoComponent } from './additional-shop-info.component';
import {HttpClient} from "@angular/common/http";

describe('AdditionalShopInfoComponent', () => {
  let component: AdditionalShopInfoComponent;
  let fixture: ComponentFixture<AdditionalShopInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalShopInfoComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalShopInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
