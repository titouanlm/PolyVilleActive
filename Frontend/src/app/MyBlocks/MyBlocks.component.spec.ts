import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlocksComponent } from './MyBlocks.component';

describe('MyBlocks', () => {
  let component: MyBlocksComponent;
  let fixture: ComponentFixture<MyBlocksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBlocksComponent ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
