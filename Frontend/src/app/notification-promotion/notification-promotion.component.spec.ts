import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationPromotionComponent } from './notification-promotion.component';

describe('NotificationPromotionComponent', () => {
  let component: NotificationPromotionComponent;
  let fixture: ComponentFixture<NotificationPromotionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationPromotionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
