import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileMenuDialogComponent } from './mobile-menu-dialog.component';

describe('MobileMenuDialogComponent', () => {
  let component: MobileMenuDialogComponent;
  let fixture: ComponentFixture<MobileMenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileMenuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileMenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
