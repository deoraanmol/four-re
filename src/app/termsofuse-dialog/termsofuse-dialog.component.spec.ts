import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsofuseDialogComponent } from './termsofuse-dialog.component';

describe('TermsofuseDialogComponent', () => {
  let component: TermsofuseDialogComponent;
  let fixture: ComponentFixture<TermsofuseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsofuseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsofuseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
