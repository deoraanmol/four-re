import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {GetdepositDialogComponent} from '../getdeposit-dialog/getdeposit-dialog.component';

@Component({
  selector: 'app-mobile-menu-dialog',
  templateUrl: './mobile-menu-dialog.component.html',
  styleUrls: ['./mobile-menu-dialog.component.css']
})
export class MobileMenuDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GetdepositDialogComponent>) { }

  ngOnInit() {
  }

  closeMobMenuDialog() {
    this.dialogRef.close();
  }
}
