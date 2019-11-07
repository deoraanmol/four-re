import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqMobileComponent } from './faq-mobile.component';

describe('FaqMobileComponent', () => {
  let component: FaqMobileComponent;
  let fixture: ComponentFixture<FaqMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FaqMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FaqMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
