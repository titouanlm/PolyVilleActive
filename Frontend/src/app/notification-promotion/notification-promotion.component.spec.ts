import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPromotionComponent } from './notification-promotion.component';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

describe('NotificationPromotionComponent', () => {
  let component: NotificationPromotionComponent;
  let fixture: ComponentFixture<NotificationPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationPromotionComponent ],
      providers: [{provide: MatDialogRef, useValue: {}},{provide: HttpClient, useValue: {}},{provide: MAT_DIALOG_DATA, useValue: {}}],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
