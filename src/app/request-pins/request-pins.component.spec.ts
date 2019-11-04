import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPinsComponent } from './request-pins.component';

describe('RequestPinsComponent', () => {
  let component: RequestPinsComponent;
  let fixture: ComponentFixture<RequestPinsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestPinsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
