import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MatDialog} from "@angular/material";
import {TermsofuseDialogComponent} from "../termsofuse-dialog/termsofuse-dialog.component";
import {GeneralDialogComponent} from "../general-dialog/general-dialog.component";
import {Router} from "@angular/router";


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {
  userAddressValidations: FormGroup;
  public sent:boolean;

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private router: Router) {}
  ngOnInit() {
    this.userAddressValidations = this.formBuilder.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      otp: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  openTermsOfUse() {
    const dialogRef = this.dialog.open(TermsofuseDialogComponent, {
      width: '500px',
      data: {name: "Anmol", animal: "Deora"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  sendOtp() {

  }

  openOTPSuccess() {
    this.sendOtp();
    let content = "We have sent a 4 digit OTP on your number "+this.userAddressValidations.value.mobileNumber+". Please use that to continue.";
    if(this.userAddressValidations.get('mobileNumber').status === 'INVALID') {
      content = "Please enter a valid mobile number"
    }
    const dialogRef = this.dialog.open(GeneralDialogComponent, {
      width: '500px',
      data: {
        header: 'OTP Sent',
        content: content,
        fields: {phone: '1234'}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



