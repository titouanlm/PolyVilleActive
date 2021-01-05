import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemStatisticsComponent } from './item-statistics.component';
import {HttpClient} from "@angular/common/http";

describe('ItemStatisticsComponent', () => {
  let component: ItemStatisticsComponent;
  let fixture: ComponentFixture<ItemStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemStatisticsComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
