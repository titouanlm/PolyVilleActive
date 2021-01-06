import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCulturalActorAuthentificationComponent } from './popup-cultural-actor-authentification.component';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

describe('PopupCulturalActorAuthentificationComponent', () => {
  let component: PopupCulturalActorAuthentificationComponent;
  let fixture: ComponentFixture<PopupCulturalActorAuthentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCulturalActorAuthentificationComponent ],
      providers: [{provide: MatDialogRef, useValue: {}},{provide: Router, useValue: {}},{provide: HttpClient, useValue: {}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCulturalActorAuthentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
