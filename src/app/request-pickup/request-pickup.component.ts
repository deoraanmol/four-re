import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Society} from "../interfaces/Society";
import {PaymentTypes} from "../interfaces/payment-types";
import {TimeSlots} from "../interfaces/time-slots";
import {TimeSlotServiceService} from "../services/time-slot-service.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../services/current-user.service";
import {Observable} from "rxjs";
import {UserHttpService} from "../services/user-http.service";
import {tap} from "rxjs/operators";


@Component({
  selector: 'app-request-pickup',
  templateUrl: './request-pickup.component.html',
  styleUrls: ['./request-pickup.component.css']
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
              private currentUserService: CurrentUserService,
              private userhttpService: UserHttpService) { }

  ngOnInit() {

    this.requestPickupValidations = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      society: ['', Validators.required],
      flatNumber: ['', Validators.required],
      creditTo: ['', Validators.required],
      accountId: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      noOfBags: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      pickupTimeSlot: ['', Validators.required]
    });
    // this.currentUserService.currentUserData = {
    //   _id: 'jdhfjkd',
    //   email: 'a@a.co',
    //   phoneNumber: '9560699442',
    //   flatNumber: '12',
    //   creditTo: 'PayTM',
    //   accountId: 'Acc 123',
    // }
    if(this.currentUserService.currentUserData) {
      this.currentUser = this.currentUserService.currentUserData;
      this.requestPickupValidations.patchValue({
        name: this.currentUser['name'],
        email: this.currentUser['email'],
        phoneNumber: this.currentUser['phoneNumber'],
        society: this.currentUser['society'],
        flatNumber: this.currentUser['flatNumber'],
        creditTo: this.currentUser['creditTo'],
        accountId: this.currentUser['accountId'],
      });
    } else {
      this.router.navigate(['/get-started']);
    }
    this.timeSlots = this.timeSlotService.getNextSlots(new Date().getHours());
  }

  redirectToHome() {
    this.router.navigate(['/home-content']);
  }
  requestPickup() {
    var requestPickupRequest = {
      "name": this.requestPickupValidations.controls.name.value,
      "society": this.requestPickupValidations.controls.society.value,
      "flatNumber": this.requestPickupValidations.controls.flatNumber.value,
      "email": this.requestPickupValidations.controls.email.value,
      "creditTo": this.requestPickupValidations.controls.creditTo.value,
      "accountId": this.requestPickupValidations.controls.accountId.value,
      "noOfBags": this.requestPickupValidations.controls.noOfBags.value,
      "userId": this.currentUserService.currentUserData['_id'].toString(),
      "pickupTimeSlot": this.getTimeSlotString()
    }
    this.userhttpService.storeRequestPickup(requestPickupRequest).subscribe(res => {
      console.log("request pickup saved, navigating to rewards");
      this.router.navigate(['/rewards-earned']);
    });

  }

  private getTimeSlotString() {
    let timeSlotObj = this.requestPickupValidations.controls.pickupTimeSlot.value;
    return timeSlotObj.day + ", " + timeSlotObj.startTime + " - " + timeSlotObj.endTime;
  }
}
