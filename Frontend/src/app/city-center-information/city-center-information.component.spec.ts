import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityCenterInformationComponent } from './city-center-information.component';

describe('CityCenterInformationComponent', () => {
  let component: CityCenterInformationComponent;
  let fixture: ComponentFixture<CityCenterInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityCenterInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCenterInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
