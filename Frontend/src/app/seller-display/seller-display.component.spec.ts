import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDisplayComponent } from './seller-display.component';

describe('SellerDisplayComponent', () => {
  let component: SellerDisplayComponent;
  let fixture: ComponentFixture<SellerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerDisplayComponent ]
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
