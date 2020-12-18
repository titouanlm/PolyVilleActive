import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownHallEmployeeHomeComponent } from './town-hall-employee-home.component';

describe('TownHallEmployeeHomeComponent', () => {
  let component: TownHallEmployeeHomeComponent;
  let fixture: ComponentFixture<TownHallEmployeeHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownHallEmployeeHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownHallEmployeeHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
