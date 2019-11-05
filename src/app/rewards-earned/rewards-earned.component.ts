import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {TermsofuseDialogComponent} from "../termsofuse-dialog/termsofuse-dialog.component";
import {GeneralDialogComponent} from "../general-dialog/general-dialog.component";
import {ActivatedRoute, Route, Router} from '@angular/router';
import {Society} from "../interfaces/Society";
import {PaymentTypes} from "../interfaces/payment-types";
import {CurrentUserService} from "../services/current-user.service";
import {UserHttpService} from "../services/user-http.service";
import {CompletedPickups, PendingPickups} from '../interfaces/PendingPickups';
import {UserProfile} from "../interfaces/user-profile";
import {GetRewardsComponent} from "../get-rewards/get-rewards.component";
import {GetdepositDialogComponent} from "../getdeposit-dialog/getdeposit-dialog.component";
import {AngularFireAuth} from '@angular/fire/auth';
import {MobileMenuDialogComponent} from '../mobile-menu-dialog/mobile-menu-dialog.component';

@Component({
  selector: 'app-rewards-earned',
  templateUrl: './rewards-earned.component.html',
  styleUrls: ['./rewards-earned.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RewardsEarnedComponent implements OnInit {
  userProfileForm: FormGroup;
  societies: Society[] =[];
  paymentTypes: PaymentTypes[] = []
  pendingPickups: PendingPickups[] = [];
  completedPickups: CompletedPickups[] = [];
  fetchedUser: UserProfile;
  rewardsEarned: Number = 0;
  activeTab:string = null;
  activeTabIdx: number = 0;
  rewardsPerBag = 0;
  upFormSubmitted: boolean = false;
  pendingReqSpinner: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private dialog: MatDialog,
              private router: Router,
              private angularFireAuth: AngularFireAuth,
              private userHttpService: UserHttpService,
              private currentUserService: CurrentUserService,
              private snackbar: MatSnackBar) {
    this.activeTab = this.router.getCurrentNavigation().extras.state ? this.router.getCurrentNavigation().extras.state.activeTab : null;
    if(this.activeTab === "PROFILE") {
      this.activeTabIdx = 1;
    } else {
      this.activeTabIdx = 0;
    }
  }

  ngOnInit() {
    this.pendingReqSpinner = true;
    this.currentUserService.refreshUserData(this.angularFireAuth);
    this.userHttpService.getAppConfig()
      .subscribe(res => {
        this.societies = res.societies;
        this.paymentTypes = res.paymentTypes;
      })
    this.afterUserRefreshed();
    this.userProfileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      society: ['', Validators.required],
      flatNumber: ['', Validators.required],
      creditTo: ['', Validators.required],
      accountId: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
    this.rewardsEarned = this.currentUserService.currentUserData
      ? this.currentUserService.currentUserData['rewardsEarned']
      : 0;
    this.userHttpService.getAppConfig()
      .subscribe(res => {
        this.rewardsPerBag = res.rewardsPerBag;
      })
  }

  afterUserRefreshed() {
    this.currentUserService.userRefreshed.subscribe(refreshedUser => {
      this.getPendingRequests(refreshedUser['_id']);
      this.getCompletedRequests(refreshedUser['_id']);
      this.getUserProfile();
    });
  }

  getPendingRequests(_id) {
    if(_id) {
      this.currentUserService.currentUserData['_id'] = _id;
    } else {
      //todo anmol mock
      this.currentUserService.currentUserData['_id'] = "5da7e29e552fe14e9500d928";
    }
    if(this.currentUserService.currentUserData
      && this.currentUserService.currentUserData['_id']) {
      this.userHttpService
        .getPendingPickups(this.currentUserService.currentUserData['_id'])
        .subscribe(res => {
          this.pendingPickups = res;
          this.pendingReqSpinner = false;
        });
    }
  }

  getCompletedRequests(_id) {
    if(_id) {
      this.currentUserService.currentUserData['_id'] = _id;
      if(this.currentUserService.currentUserData
        && this.currentUserService.currentUserData['_id']) {
        this.userHttpService
          .getCompletedPickups(this.currentUserService.currentUserData['_id'])
          .subscribe(res => {
            this.completedPickups = res;
          });
      }
    }
  }

  getUserProfile() {
    this.userHttpService.getUser(this.currentUserService.currentUserData['phoneNumber'])
      .subscribe(resp => {
        let res = resp[0];
        this.fetchedUser = res;
        this.rewardsEarned = res.rewardsEarned;
        this.setProfileFormValues(res);
      });
  }

  setProfileFormValues(res) {
    this.userProfileForm.patchValue({
      name: res.name,
      email: res.email,
      phoneNumber: res.phoneNumber,
      society: res.society,
      flatNumber: res.flatNumber,
      creditTo: res.creditTo,
      accountId: this.currentUserService.excludeCountryCode("IND", res.accountId),
    });
  }

  _keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }


  openGetDepositDialog(pendingPickup: PendingPickups) {
    const dialogRef = this.dialog.open(GetdepositDialogComponent, {
      width: '500px',
      data: {
        noOfBags: pendingPickup.noOfBags,
        paymentType: pendingPickup.paymentType,
        accountId: pendingPickup.accountId,
        requestId: pendingPickup._id,
        userId: pendingPickup.userId,
        rewardsPerBag: 10
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: '+result.userId);
      this.currentUserService.refreshUserData(this.angularFireAuth);
    });
  }

  resetUserProfile() {
    this.userProfileForm.reset();
    this.setProfileFormValues(this.fetchedUser);
  }

  updateProfile() {
    this.upFormSubmitted = true;
    debugger
    if(this.userProfileForm.invalid) {

    } else {
      var userObj = {
        "name": this.userProfileForm.controls.name.value,
        "society": this.userProfileForm.controls.society.value,
        "flatNumber": this.userProfileForm.controls.flatNumber.value,
        "email": this.userProfileForm.controls.email.value,
        "creditTo": this.userProfileForm.controls.creditTo.value,
        "accountId": this.userProfileForm.controls.accountId.value
      };
      var _id = this.currentUserService.currentUserData['_id'].toString();
      this.userHttpService.updateUser(userObj, _id)
        .subscribe(res => {
          this.fetchedUser = res;
          this.getUserProfile();
          this.currentUserService.openSnackbar(this.snackbar, "User Profile is successfully updated", "Ok");
        });
    }
  }

  signOutFromRE() {
    this.currentUserService.signOutUser(this.angularFireAuth);
  }

  openREScreen(selectTab) {
    this.router.navigate(["/dashboard"], {state: {activeTab: selectTab}});
  }

  cancelPendingPickup(pendingPickup: PendingPickups) {
    this.userHttpService.cancelRequestPickup(pendingPickup)
      .subscribe(res => {
        this.currentUserService.openSnackbar(this.snackbar, 'Request of Rs. '+pendingPickup.totalValue +
          ' successfully cancelled', 'Ok');
        this.currentUserService.refreshUserData(this.angularFireAuth);
      });
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
      } else this.router.navigate(['/home']);
    });
  }

  slotTodayOrTom(slotDate: string) {
    var date = new Date(slotDate).getDate();
    if(date === new Date().getDate()) {
      return "TODAY";
    } else if(date === new Date().getDate() + 1) {
      return "TOMORROW";
    } else {
      return "NONE"
    }
  }

  takeHomeAt(anchorId: string) {
    this.router.navigate(["/home"], {state: {anchorId: anchorId}});
  }

  navToReqPickup() {
    this.router.navigate(['/pickup']);
  }
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



