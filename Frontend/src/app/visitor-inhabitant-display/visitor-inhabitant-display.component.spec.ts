import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisitorInhabitantDisplayComponent } from './visitor-inhabitant-display.component';
import {HttpClient} from "@angular/common/http";
import {NgxToolboxBuilderService} from "ngx-blockly";

describe('BasicDisplayComponent', () => {
  let component: VisitorInhabitantDisplayComponent;
  let fixture: ComponentFixture<VisitorInhabitantDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorInhabitantDisplayComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorInhabitantDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
