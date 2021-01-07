import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventListRatingComponent } from './event-list-rating.component';

describe('EventListRatingComponent', () => {
  let component: EventListRatingComponent;
  let fixture: ComponentFixture<EventListRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventListRatingComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventListRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
