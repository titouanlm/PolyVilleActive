import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CulturalActorHomeComponent } from './cultural-actor-home.component';

describe('CulturalActorHomeComponent', () => {
  let component: CulturalActorHomeComponent;
  let fixture: ComponentFixture<CulturalActorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CulturalActorHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CulturalActorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
