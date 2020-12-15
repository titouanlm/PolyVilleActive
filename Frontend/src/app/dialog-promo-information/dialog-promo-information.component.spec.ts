import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPromoInformationComponent } from './dialog-promo-information.component';

describe('DialogPromoInformationComponent', () => {
  let component: DialogPromoInformationComponent;
  let fixture: ComponentFixture<DialogPromoInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPromoInformationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPromoInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
