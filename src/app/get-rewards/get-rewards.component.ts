import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MatDialog} from "@angular/material";
import {TermsofuseDialogComponent} from "../termsofuse-dialog/termsofuse-dialog.component";
import {GeneralDialogComponent} from "../general-dialog/general-dialog.component";
import {Router} from "@angular/router";
import {Society} from "../interfaces/Society";
import {PaymentTypes} from "../interfaces/payment-types";

@Component({
  selector: 'app-get-rewards',
  templateUrl: './get-rewards.component.html',
  styleUrls: ['./get-rewards.component.css']
})
export class GetRewardsComponent implements OnInit {
  requestPickupValidations: FormGroup;
  societies: Society[] =[];
  paymentTypes: PaymentTypes[] = []

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit() {
    this.requestPickupValidations = this.formBuilder.group({
      noOfBags: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
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

  redirectToHome() {
    this.router.navigate(['/home']);
  }

  saveProfile() {
    this.router.navigate(['/pickup']);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



