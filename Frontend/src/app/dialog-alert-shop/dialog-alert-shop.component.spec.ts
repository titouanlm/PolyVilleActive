import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlertShopComponent } from './dialog-alert-shop.component';

describe('DialogAlertShopComponent', () => {
  let component: DialogAlertShopComponent;
  let fixture: ComponentFixture<DialogAlertShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAlertShopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAlertShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
