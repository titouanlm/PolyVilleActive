import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupCulturalActorAuthentificationComponent } from './popup-cultural-actor-authentification.component';

describe('PopupCulturalActorAuthentificationComponent', () => {
  let component: PopupCulturalActorAuthentificationComponent;
  let fixture: ComponentFixture<PopupCulturalActorAuthentificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupCulturalActorAuthentificationComponent ]
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
