import { Injectable } from '@angular/core';
import {TimeSlots} from "../interfaces/time-slots";
import {UserHttpService} from './user-http.service';

@Injectable({
  providedIn: 'root'
})
export class TimeSlotServiceService {

  givenSlots: number[] = [8, 11, 14, 17]; //08:am to 08:00pm
  givenTimeSlotDuration: number = 3;
  timeSlots: TimeSlots[] = [];
  hourMappings: object = {
    8: "08:00 AM",
    11: "11:00 AM",
    14: "02:00 PM",
    17: "05:00 PM",
    20: "08:00 PM",
  };

  constructor(private userHttpService: UserHttpService) {
    this.userHttpService.getAppConfig()
      .subscribe(res => {
        this.givenSlots = res.givenTimeSlots;
        this.givenTimeSlotDuration = res.givenTimeSlotInterval;
      });
  }
}
