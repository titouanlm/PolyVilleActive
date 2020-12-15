import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVisitorInhabitantAutorisationComponent } from './popup-visitor-inhabitant-autorisation.component';

describe('VisitorInhabitantAuthenticationComponent', () => {
  let component: PopupVisitorInhabitantAutorisationComponent;
  let fixture: ComponentFixture<PopupVisitorInhabitantAutorisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupVisitorInhabitantAutorisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupVisitorInhabitantAutorisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
