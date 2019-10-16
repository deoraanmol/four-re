import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDialogComponent } from './general-dialog.component';

describe('GeneralDialogComponent', () => {
  let component: GeneralDialogComponent;
  let fixture: ComponentFixture<GeneralDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
