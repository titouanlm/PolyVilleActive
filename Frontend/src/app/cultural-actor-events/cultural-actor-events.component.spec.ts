import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalActorEventsComponent } from './cultural-actor-events.component';
import {MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";

describe('CulturalActorEventsComponent', () => {
  let component: CulturalActorEventsComponent;
  let fixture: ComponentFixture<CulturalActorEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturalActorEventsComponent ],
      providers: [{provide: HttpClient, useValue: {}}]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalActorEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
