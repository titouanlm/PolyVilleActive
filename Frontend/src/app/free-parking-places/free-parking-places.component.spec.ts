import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeParkingPlacesComponent } from './free-parking-places.component';

describe('FreeParkingPlacesComponent', () => {
  let component: FreeParkingPlacesComponent;
  let fixture: ComponentFixture<FreeParkingPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeParkingPlacesComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeParkingPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
