import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreItemsComponent } from './store-items.component';
import {HttpClient} from "@angular/common/http";

describe('StoreItemsComponent', () => {
  let component: StoreItemsComponent;
  let fixture: ComponentFixture<StoreItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreItemsComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
