import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTownHallEmployeeAuthentificationComponent } from './popup-town-hall-employee-authentification.component';

describe('PopupTownHallEmployeeAuthentificationComponent', () => {
  let component: PopupTownHallEmployeeAuthentificationComponent;
  let fixture: ComponentFixture<PopupTownHallEmployeeAuthentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTownHallEmployeeAuthentificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTownHallEmployeeAuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
