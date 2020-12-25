import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TownHallEmployeeBlocksComponent } from './town-hall-employee-blocks.component';

describe('MayorBlocksComponent', () => {
  let component: TownHallEmployeeBlocksComponent;
  let fixture: ComponentFixture<TownHallEmployeeBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TownHallEmployeeBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TownHallEmployeeBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
