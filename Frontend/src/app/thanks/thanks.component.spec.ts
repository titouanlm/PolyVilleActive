import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanksComponent } from './thanks.component';
import {MatDialogRef} from "@angular/material/dialog";

describe('ThanksComponent', () => {
  let component: ThanksComponent;
  let fixture: ComponentFixture<ThanksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThanksComponent ],
      providers: [{provide: MatDialogRef, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
