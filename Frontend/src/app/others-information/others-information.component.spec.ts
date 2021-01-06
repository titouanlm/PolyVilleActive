import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersInformationComponent } from './others-information.component';
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

describe('PromotionInformationComponent', () => {
  let component: OthersInformationComponent;
  let fixture: ComponentFixture<OthersInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersInformationComponent ],
      providers: [{provide: MatDialog, useValue: {}},{provide: HttpClient, useValue: {}}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
