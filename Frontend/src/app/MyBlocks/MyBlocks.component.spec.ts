import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlocksComponent } from './MyBlocks.component';
import {HttpClient} from "@angular/common/http";
import {NgxToolboxBuilderService} from "ngx-blockly";
import {MatDialogRef} from "@angular/material/dialog";

describe('MyBlocks', () => {
  let component: MyBlocksComponent;
  let fixture: ComponentFixture<MyBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBlocksComponent ],
      providers: [{provide: NgxToolboxBuilderService, useValue: {}},{provide: HttpClient, useValue: {}}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
