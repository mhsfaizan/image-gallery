import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOverlayComponent } from './my-overlay.component';

describe('MyOverlayComponent', () => {
  let component: MyOverlayComponent;
  let fixture: ComponentFixture<MyOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
