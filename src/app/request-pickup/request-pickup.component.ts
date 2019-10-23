import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Society} from '../interfaces/Society';
import {PaymentTypes} from '../interfaces/payment-types';
import {TimeSlots} from "../interfaces/time-slots";
import {TimeSlotServiceService} from "../services/time-slot-service.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../services/current-user.service";
import {Observable} from "rxjs";
import {UserHttpService} from "../services/user-http.service";
import {tap} from "rxjs/operators";
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
  societies: Society[] =[
    {name: 'Grand Arch'},
    {name: 'Ireo'},
    {name: 'Valley View'}
  ];
  paymentTypes: PaymentTypes[] = [
    {name: 'PayTM'}
  ]
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

  ngOnInit() {
    this.currentUserService.refreshUserData(this.angularFireAuth);
    this.timeSlots = this.timeSlotService.getNextSlots(new Date().getHours());
    this.requestPickupValidations = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      society: [this.societies[0].name, Validators.required],
      flatNumber: ['', Validators.required],
      creditTo: [this.paymentTypes[0].name, Validators.required],
      accountId: [this.currentUser['phoneNumber'], Validators.required],
      phoneNumber: ['', [Validators.required]],
      noOfBags: ['', [Validators.required]],
      pickupTimeSlot: [this.timeSlots[0].id, Validators.required]
    });
    this.currentUserService.userRefreshed
      .subscribe(res => {
        if(this.currentUserService.currentUserData) {
          this.currentUser = this.currentUserService.currentUserData;
          this.requestPickupValidations.patchValue({
            name: this.currentUser['name'],
            email: this.currentUser['email'],
            phoneNumber: this.currentUser['phoneNumber'],
            society: this.currentUser['society'],
            flatNumber: this.currentUser['flatNumber'],
            creditTo: this.currentUser['creditTo'],
            accountId: this.currentUser['accountId']
              ? this.currentUser['accountId']
              : this.currentUser['phoneNumber']
          });
        } else {
          // this.router.navigate(['/get-started']);
        }
      });
  }

  public findInvalidControls() {
    debugger
    const invalid = [];
    const controls = this.requestPickupValidations.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  redirectToHome() {
    this.router.navigate(['/home-content']);
  }
  requestPickup() {
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
}
