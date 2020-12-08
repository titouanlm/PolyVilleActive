import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BasicDisplayComponent } from './basic-display.component';

describe('BasicDisplayComponent', () => {
  let component: BasicDisplayComponent;
  let fixture: ComponentFixture<BasicDisplayComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
