import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCenterInformationComponent } from './city-center-information.component';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient, HttpClientModule} from "@angular/common/http";

describe('CityCenterInformationComponent', () => {
  let component: CityCenterInformationComponent;
  let fixture: ComponentFixture<CityCenterInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityCenterInformationComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCenterInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
