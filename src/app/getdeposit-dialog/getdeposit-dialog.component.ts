import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Society} from "../interfaces/Society";
import {PaymentTypes} from "../interfaces/payment-types";
import {Router} from "@angular/router";
import {UserHttpService} from "../services/user-http.service";
import {CurrentUserService} from '../services/current-user.service';

class DialogData {
  noOfBags: String;
  paymentType: String;
  accountId: String;
  requestId: String;
  userId: String
}

@Component({
  selector: 'app-getdeposit-dialog',
  templateUrl: './getdeposit-dialog.component.html',
  styleUrls: ['./getdeposit-dialog.component.css']
})
export class GetdepositDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<GetdepositDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private formBuilder: FormBuilder,
              private userHttpService: UserHttpService,
              private router: Router,
              private snackbar: MatSnackBar,
              private currentUserService: CurrentUserService) { }

  getDepositForm: FormGroup;
  societies: Society[] =[
    {name: 'Grand Arch'},
    {name: 'Ireo'},
    {name: 'Valley View'}
  ];
  paymentTypes: PaymentTypes[] = [
    {name: 'PayTM'}
  ];
  invalidPIN = false;

  ngOnInit() {
    this.invalidPIN = false;
    this.getDepositForm = this.formBuilder.group({
      noOfBags: ['', Validators.required],
      paymentType: ['', Validators.required],
      accountId: ['', Validators.required],
      pickupCode: ['', Validators.required],
      touCheckbox: [true, Validators.pattern('true')]
    });
    this.getDepositForm.patchValue({
      noOfBags: this.data.noOfBags,
      paymentType: this.data.paymentType,
      accountId: this.data.accountId,
      pickupCode: '',
    });
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  redirectToHome() {
    this.router.navigate(['/home-content']);
  }

  saveProfile() {
    this.router.navigate(['/request-pickup']);
  }

  onNoClick(): void {
    this.dialogRef.close({userId: this.data.userId});
  }

  completePendingRequest() {
    this.userHttpService.completeRequestPickup({
      _id: this.data.userId,
      requestId: this.data.requestId,
      pinCode: this.getDepositForm.controls.pickupCode.value,
      noOfBags: this.getDepositForm.controls.noOfBags.value
    }).subscribe(res => {
      if(res.error) {
        this.invalidPIN = true;
      } else {
        this.invalidPIN = false;
        this.onNoClick();
        this.currentUserService.openSnackbar(this.snackbar, "Request was successfully submitted", "Ok");
      }
    });

  }
}
