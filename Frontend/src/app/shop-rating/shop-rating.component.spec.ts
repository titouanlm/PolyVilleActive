import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopRatingComponent } from './shop-rating.component';

describe('ShopRatingComponent', () => {
  let component: ShopRatingComponent;
  let fixture: ComponentFixture<ShopRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopRatingComponent ]
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
