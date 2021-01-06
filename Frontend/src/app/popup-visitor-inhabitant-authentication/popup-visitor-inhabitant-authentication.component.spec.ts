import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisitorInhabitantAuthenticationComponent } from './popup-visitor-inhabitant-authentication.component';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {InhabitantService} from "../../services/inhabitant.service";

describe('VisitorInhabitantAuthenticationComponent', () => {
  let component: PopupVisitorInhabitantAuthenticationComponent;
  let fixture: ComponentFixture<PopupVisitorInhabitantAuthenticationComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisitorInhabitantAuthenticationComponent ],
      providers: [{provide: MatDialogRef, useValue: {}},{provide: Router, useValue: {}},
      {provide: MatDialogRef, useValue: {}},{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
    let httpService = TestBed.inject(HttpClient);
    //spyOn(httpService, "get").and.returnValue(null);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisitorInhabitantAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
