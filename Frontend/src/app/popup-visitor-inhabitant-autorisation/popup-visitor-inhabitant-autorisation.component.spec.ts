import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisitorInhabitantAutorisationComponent } from './popup-visitor-inhabitant-autorisation.component';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

describe('VisitorInhabitantAuthenticationComponent', () => {
  let component: PopupVisitorInhabitantAutorisationComponent;
  let fixture: ComponentFixture<PopupVisitorInhabitantAutorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisitorInhabitantAutorisationComponent ],
      providers: [{provide: MatDialogRef, useValue: {}},{provide: Router, useValue: {}},{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisitorInhabitantAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
