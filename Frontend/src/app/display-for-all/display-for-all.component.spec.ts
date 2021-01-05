import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayForAllComponent } from './display-for-all.component';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

describe('DisplayForAllComponent', () => {
  let component: DisplayForAllComponent;
  let fixture: ComponentFixture<DisplayForAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{provide: MatDialog, useValue: {}}],
      declarations: [ DisplayForAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayForAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
