import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Society} from '../interfaces/Society';
import {BagSize} from '../interfaces/BagSize';
import {PaymentTypes} from '../interfaces/payment-types';
import {Router} from "@angular/router";
import {CurrentUserService} from "../services/current-user.service";
import {Observable} from "rxjs";
import {UserHttpService} from "../services/user-http.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {MatDialog, MatSnackBar} from '@angular/material';
import {MobileMenuDialogComponent} from '../mobile-menu-dialog/mobile-menu-dialog.component';
import {DatePipe} from '@angular/common';


@Component({
  selector: 'app-request-pickup',
  templateUrl: './request-pickup.component.html',
  styleUrls: ['./request-pickup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestPickupComponent implements OnInit {
  requestPickupValidations: FormGroup;
  societies: Society[] =[];
  bagSizes: BagSize[] =[];
  paymentTypes: PaymentTypes[] = [];
  formSubmitted: boolean = false;
  currentUser = {};
  form: FormGroup;
  user: Observable<object>;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private userHttpService: UserHttpService,
              private angularFireAuth: AngularFireAuth,
              private currentUserService: CurrentUserService,
              private userhttpService: UserHttpService,
              private snackar: MatSnackBar,
              private dialog: MatDialog,
              private datePipe: DatePipe) {}

  getFormValidationErrors() {
    Object.keys(this.requestPickupValidations.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.requestPickupValidations.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  ngOnInit() {
    this.afterInitSteps();
    this.getNowDateTime();
  }

  isNewReqAllowed() {
    this.userHttpService
      .getPendingPickups(this.currentUserService.currentUserData['_id'])
      .subscribe(res => {
        if(res && res.length > 0) {
          //there are pending requests, dont allow a new pickup -> navigate directly to my rewards
          this.currentUserService.navToRewardsEarned();
        } else {
        }
      });
  }


  afterInitSteps() {
    this.currentUserService.refreshUserData(this.angularFireAuth);
    this.userhttpService.getAppConfig()
      .subscribe(res => {
        this.societies = res.societies;
        this.bagSizes = res.bagSizes;
        this.paymentTypes = res.paymentTypes;
        this.requestPickupValidations.controls['society'].setValue(this.societies[0].name);
        this.requestPickupValidations.controls['creditTo'].setValue(this.paymentTypes[0].name);
        this.requestPickupValidations.controls['bagSize'].setValue(this.bagSizes[0].size);
      })
    this.requestPickupValidations = this.formBuilder.group({
      name: ['', Validators.required],
      society: ['', Validators.required],
      creditTo: ['', Validators.required],
      accountId:
        [ this.currentUserService.excludeCountryCode("IND", this.currentUser['phoneNumber']),
          Validators.compose(this.currentUserService.phoneNumberValidator)
        ],
      phoneNumber: [''],
      noOfBags: ['', Validators.compose([Validators.min(1), Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      bagSize: ['', Validators.required]
    });
    this.currentUserService.userRefreshed
      .subscribe(res => {
        if(this.currentUserService.currentUserData) {
          this.currentUser = this.currentUserService.currentUserData;
          this.requestPickupValidations.patchValue({
            name: this.currentUser['name'],
            phoneNumber: this.currentUser['phoneNumber'],
            creditTo: this.currentUser['creditTo'],
            society: this.currentUser['society'],
            accountId: this.currentUser['accountId']
              ? this.currentUserService.excludeCountryCode("IND", this.currentUser['accountId'])
              : this.currentUserService.excludeCountryCode("IND", this.currentUser['phoneNumber'])
          });
          this.isNewReqAllowed();
        } else {
          // this.router.navigate(['/get-started']);
        }
      });
  }

  redirectToHome() {
    this.router.navigate(['/home']);
  }
  requestPickup() {
    this.formSubmitted = true;
    if(this.requestPickupValidations.status === "INVALID") {

    } else {
      if(this.currentUser['phoneNumber']) {
        var requestPickupRequest = {
          "name": this.requestPickupValidations.controls.name.value,
          "society": this.requestPickupValidations.controls.society.value,
          "creditTo": this.requestPickupValidations.controls.creditTo.value,
          "accountId": this.requestPickupValidations.controls.accountId.value,
          "noOfBags": this.requestPickupValidations.controls.noOfBags.value,
          "userId": this.currentUserService.currentUserData['_id'].toString(),
          "totalValue": this.getAmt(),
          "bagSize": this.findBagSize(this.requestPickupValidations.controls.bagSize.value),
          "rewardsEarned": this.currentUserService.currentUserData['rewardsEarned'],
          "requestCreated": this.getNowDateTime()
        }
        this.userhttpService.storeRequestPickup(requestPickupRequest).subscribe(res => {

          //update new rewards earned
          this.currentUserService.currentUserData['rewardsEarned'] = res.rewardsEarned;
          console.log("drop bags saved, navigating to rewards: "+this.currentUserService.currentUserData['rewardsEarned']);
          this.currentUserService.navToRewardsEarned();
        });
      } else {
        this.currentUserService.openSnackbar(this.snackar, "User is not logged in", "Ok");
      }
    }
  }



  signOutFromRP() {
    this.currentUserService.signOutUser(this.angularFireAuth);
  }

  openMobileMenuDialog() {
    const dialogRef = this.dialog.open(MobileMenuDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: {

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result.anchorId) {
        this.takeHomeAt(result.anchorId);
      } else this.redirectToHome();
    });
  }

  openREScreen(selectTab) {
    this.router.navigate(["/dashboard"], {state: {activeTab: selectTab}});
  }

  takeHomeAt(anchorId: string) {
     this.router.navigate(["/home"], {state: {anchorId: anchorId}});
  }

  changePaymentType() {
    if(this.currentUserService.isPayTM(this.requestPickupValidations.controls['creditTo'].value)) {
      this.requestPickupValidations.controls['accountId'].setValidators(this.currentUserService.phoneNumberValidator);
    } else {
      this.requestPickupValidations.controls['accountId'].setValidators(Validators.required);
    }
    this.requestPickupValidations.controls["accountId"].updateValueAndValidity();
  }

  getNowDateTime() {
    return this.datePipe.transform(new Date(), "dd MMM yyyy hh:mm a");
  }

  getAmt() {
    var selectedBagSize = this.requestPickupValidations.controls.bagSize.value;
    var bagSizeObj = this.findBagSize(selectedBagSize);
    if(bagSizeObj) {
      var amt = (this.requestPickupValidations.controls.noOfBags.value * bagSizeObj.amountPerBag);
      if(amt < 0) {
        return 0;
      }
      return amt;
    } else {
      return 0;
    }

  }

  findBagSize(selectedSize) {
    var gotBagSize = null;
    for(var i=0; i < this.bagSizes.length; i++) {
      if(this.bagSizes[i].size == selectedSize) {
        gotBagSize = this.bagSizes[i];
        break;
      }
    }
    return gotBagSize;
  }
}
