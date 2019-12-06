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
  userId: String;
  rewardsPerBag: number;
  requestSociety: String;
  bagSize: String;
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
  gdFormSubmitted: boolean = false;
  societies: Society[] =[];
  paymentTypes: PaymentTypes[] = [];
  invalidPIN = false;

  ngOnInit() {
    this.invalidPIN = false;
    this.userHttpService.getAppConfig()
      .subscribe(res => {
        this.societies = res.societies;
        this.paymentTypes = res.paymentTypes;
      });
    this.getDepositForm = this.formBuilder.group({
      noOfBags: ['', Validators.compose([Validators.min(1), Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      paymentType: ['', Validators.required],
      accountId: ['', Validators.compose(this.currentUserService.phoneNumberValidator)],
      pickupCode: ['', Validators.required],
      touCheckbox: [true, Validators.pattern('true')],
      bagSize: [this.data.bagSize],
    });
    this.getDepositForm.patchValue({
      noOfBags: this.data.noOfBags,
      paymentType: this.data.paymentType,
      accountId: this.currentUserService.excludeCountryCode("IND", this.data.accountId),
      pickupCode: ''
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
    this.router.navigate(['/home']);
  }

  saveProfile() {
    this.router.navigate(['/pickup']);
  }

  onNoClick(): void {
    this.dialogRef.close({userId: this.data.userId});
  }

  completePendingRequest() {
    this.gdFormSubmitted = true;
    if(this.getDepositForm.invalid) {

    } else {
      this.userHttpService.completeRequestPickup({
        _id: this.data.userId,
        requestId: this.data.requestId,
        pinCode: this.getDepositForm.controls.pickupCode.value,
        noOfBags: this.getDepositForm.controls.noOfBags.value,
        paymentType: this.getDepositForm.controls.paymentType.value,
        accountId: this.getDepositForm.controls.accountId.value,
        requestSociety: this.data.requestSociety,
        requestUpdated: new Date()
      }).subscribe(res => {
        if(res.error) {
          this.invalidPIN = true;
        } else {
          this.invalidPIN = false;
          this.onNoClick();
          this.currentUserService.openSnackbar(this.snackbar, "Request was successfully completed", "Ok");
        }
      });
    }
  }

  getAmt() {
    return (this.getDepositForm.controls.noOfBags.value * this.data.rewardsPerBag);
  }

  changePaymentType() {
    if(this.currentUserService.isPayTM(this.getDepositForm.controls['paymentType'].value)) {
      this.getDepositForm.controls['accountId'].setValidators(this.currentUserService.phoneNumberValidator);
    } else {
      this.getDepositForm.controls['accountId'].setValidators(Validators.required);
    }
    this.getDepositForm.controls["accountId"].updateValueAndValidity();
  }
}
