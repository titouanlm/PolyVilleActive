import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisitorInhabitantDisplayComponent } from './visitor-inhabitant-display.component';

describe('BasicDisplayComponent', () => {
  let component: VisitorInhabitantDisplayComponent;
  let fixture: ComponentFixture<VisitorInhabitantDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitorInhabitantDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisitorInhabitantDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
