import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material";

class DialogData {
}

@Component({
  selector: 'app-termsofuse-dialog',
  templateUrl: './termsofuse-dialog.component.html',
  styleUrls: ['./termsofuse-dialog.component.css']
})
export class TermsofuseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TermsofuseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
