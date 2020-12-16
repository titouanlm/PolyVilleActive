import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OthersInformationComponent } from './others-information.component';

describe('PromotionInformationComponent', () => {
  let component: OthersInformationComponent;
  let fixture: ComponentFixture<OthersInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OthersInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OthersInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
