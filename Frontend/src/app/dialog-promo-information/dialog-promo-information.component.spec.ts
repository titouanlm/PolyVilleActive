import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPromoInformationComponent } from './dialog-promo-information.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

describe('DialogPromoInformationComponent', () => {
  let component: DialogPromoInformationComponent;
  let fixture: ComponentFixture<DialogPromoInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPromoInformationComponent ],
      providers: [{provide: HttpClient, useValue: {}},{provide: MAT_DIALOG_DATA, useValue: {}}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPromoInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
