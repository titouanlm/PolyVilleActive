import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisitorInhabitantAuthenticationComponent } from './popup-visitor-inhabitant-authentication.component';

describe('VisitorInhabitantAuthenticationComponent', () => {
  let component: PopupVisitorInhabitantAuthenticationComponent;
  let fixture: ComponentFixture<PopupVisitorInhabitantAuthenticationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisitorInhabitantAuthenticationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisitorInhabitantAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
