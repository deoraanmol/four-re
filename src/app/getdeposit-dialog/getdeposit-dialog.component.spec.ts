import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetdepositDialogComponent } from './getdeposit-dialog.component';

describe('GetdepositDialogComponent', () => {
  let component: GetdepositDialogComponent;
  let fixture: ComponentFixture<GetdepositDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetdepositDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetdepositDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
