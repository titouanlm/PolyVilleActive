import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InhabitantForSellerComponent } from './inhabitant-for-seller.component';

describe('InhabitantForSellerComponent', () => {
  let component: InhabitantForSellerComponent;
  let fixture: ComponentFixture<InhabitantForSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InhabitantForSellerComponent ]
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
