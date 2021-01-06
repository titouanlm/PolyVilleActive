import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownHallEmployeeBlocksComponent } from './town-hall-employee-blocks.component';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {NgxToolboxBuilderService} from "ngx-blockly";

describe('MayorBlocksComponent', () => {
  let component: TownHallEmployeeBlocksComponent;
  let fixture: ComponentFixture<TownHallEmployeeBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownHallEmployeeBlocksComponent ],
      providers: [{provide: NgxToolboxBuilderService, useValue: {}},{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownHallEmployeeBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
