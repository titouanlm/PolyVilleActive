import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayorBlocksComponent } from './mayor-blocks.component';

describe('MayorBlocksComponent', () => {
  let component: MayorBlocksComponent;
  let fixture: ComponentFixture<MayorBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MayorBlocksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MayorBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
