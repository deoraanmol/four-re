import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

class DialogData {
  header: string;
  content: string;
  fields: object
}

@Component({
  selector: 'app-general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.css']
})
export class GeneralDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GeneralDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({action: 'false'});
  }

  onYesClick(): void {
    this.dialogRef.close({action: 'true', data: this.data.fields});
  }

}


