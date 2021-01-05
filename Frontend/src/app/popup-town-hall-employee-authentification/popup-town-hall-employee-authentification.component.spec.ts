import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTownHallEmployeeAuthentificationComponent } from './popup-town-hall-employee-authentification.component';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

describe('PopupTownHallEmployeeAuthentificationComponent', () => {
  let component: PopupTownHallEmployeeAuthentificationComponent;
  let fixture: ComponentFixture<PopupTownHallEmployeeAuthentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupTownHallEmployeeAuthentificationComponent ],
      providers: [{provide: MatDialogRef, useValue: {}},{provide: Router, useValue: {}},{provide: HttpClient, useValue: {}}]
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
