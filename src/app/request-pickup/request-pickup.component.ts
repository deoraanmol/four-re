import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Society} from '../interfaces/Society';
import {PaymentTypes} from '../interfaces/payment-types';
import {TimeSlots} from "../interfaces/time-slots";
import {TimeSlotServiceService} from "../services/time-slot-service.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../services/current-user.service";
import {Observable} from "rxjs";
import {UserHttpService} from "../services/user-http.service";
import {AngularFireAuth} from "@angular/fire/auth";
import {MatDialog, MatSnackBar} from '@angular/material';
import {MobileMenuDialogComponent} from '../mobile-menu-dialog/mobile-menu-dialog.component';


@Component({
  selector: 'app-request-pickup',
  templateUrl: './request-pickup.component.html',
  styleUrls: ['./request-pickup.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RequestPickupComponent implements OnInit {
  requestPickupValidations: FormGroup;
  societies: Society[] =[];
  paymentTypes: PaymentTypes[] = [];
  formSubmitted: boolean = false;
  timeSlots: TimeSlots[] = [];
  currentUser = {};
  form: FormGroup;
  user: Observable<object>;

  constructor(private formBuilder: FormBuilder,
              private timeSlotService: TimeSlotServiceService,
              private router: Router,
              private angularFireAuth: AngularFireAuth,
              private currentUserService: CurrentUserService,
              private userhttpService: UserHttpService,
              private snackar: MatSnackBar,
              private dialog: MatDialog) { }

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
    this.currentUserService.refreshUserData(this.angularFireAuth);
    this.userhttpService.getTimeSlots(new Date().getHours())
      .subscribe(res => {
        this.timeSlots = res.timeSlots;
        this.requestPickupValidations.controls['pickupTimeSlot'].setValue(this.timeSlots[0].id);
      });
    this.userhttpService.getAppConfig()
      .subscribe(res => {
        this.societies = res.societies;
        this.paymentTypes = res.paymentTypes;
        this.requestPickupValidations.controls['society'].setValue(this.societies[0].name);
        this.requestPickupValidations.controls['creditTo'].setValue(this.paymentTypes[0].name);
      })
    this.requestPickupValidations = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      society: ['', Validators.required],
      flatNumber: ['', Validators.required],
      creditTo: ['', Validators.required],
      accountId: [this.currentUserService.excludeCountryCode("IND", this.currentUser['phoneNumber']), Validators.required],
      phoneNumber: [''],
      noOfBags: ['', [Validators.required]],
      pickupTimeSlot: ['', Validators.required]
    });
    this.currentUserService.userRefreshed
      .subscribe(res => {
        if(this.currentUserService.currentUserData) {
          this.currentUser = this.currentUserService.currentUserData;
          this.requestPickupValidations.patchValue({
            name: this.currentUser['name'],
            email: this.currentUser['email'],
            phoneNumber: this.currentUser['phoneNumber'],
            flatNumber: this.currentUser['flatNumber'],
            creditTo: this.currentUser['creditTo'],
            accountId: this.currentUser['accountId']
              ? this.currentUserService.excludeCountryCode("IND", this.currentUser['accountId'])
              : this.currentUserService.excludeCountryCode("IND", this.currentUser['phoneNumber'])
          });
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
      this.currentUserService.openSnackbar(this.snackar, "There are some errors in the form", "Ok");
    } else {
      if(this.currentUser['phoneNumber']) {
        var requestPickupRequest = {
          "name": this.requestPickupValidations.controls.name.value,
          "society": this.requestPickupValidations.controls.society.value,
          "flatNumber": this.requestPickupValidations.controls.flatNumber.value,
          "email": this.requestPickupValidations.controls.email.value,
          "creditTo": this.requestPickupValidations.controls.creditTo.value,
          "accountId": this.requestPickupValidations.controls.accountId.value,
          "noOfBags": this.requestPickupValidations.controls.noOfBags.value,
          "userId": this.currentUserService.currentUserData['_id'].toString(),
          "pickupTimeSlot": this.getTimeSlotString(),
          "rewardsEarned": this.currentUserService.currentUserData['rewardsEarned']
        }
        this.userhttpService.storeRequestPickup(requestPickupRequest).subscribe(res => {

          //update new rewards earned
          this.currentUserService.currentUserData['rewardsEarned'] = res.rewardsEarned;
          console.log("request pickup saved, navigating to rewards: "+this.currentUserService.currentUserData['rewardsEarned']);
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
  }

  private getTimeSlotString() {
    let slotId = this.requestPickupValidations.controls.pickupTimeSlot.value;
    let timeSlotObj = this.timeSlots[slotId-1];
    return timeSlotObj.day + ", " + timeSlotObj.startTime + " - " + timeSlotObj.endTime;
  }

  openREScreen(selectTab) {
    this.router.navigate(["/dashboard"], {state: {activeTab: selectTab}});
  }
}
