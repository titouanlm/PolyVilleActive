import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingServationComponent } from './parking-servation.component';

describe('ParkingServationComponent', () => {
  let component: ParkingServationComponent;
  let fixture: ComponentFixture<ParkingServationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParkingServationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingServationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
