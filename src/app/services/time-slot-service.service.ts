import { Injectable } from '@angular/core';
import {TimeSlots} from "../interfaces/time-slots";

@Injectable({
  providedIn: 'root'
})
export class TimeSlotServiceService {

  givenSlots: number[] = [8, 11, 14, 17]; //08:am to 08:00pm
  timeSlots: TimeSlots[] = [];
  hourMappings: object = {
    8: "08:00 AM",
    11: "11:00 AM",
    14: "02:00 PM",
    17: "05:00 PM",
    20: "08:00 PM",
  };

  constructor() { }
  getNextSlots(currentHours: Number) {
    let nextGreaterIndex = -1;
    for(let idx = 0; idx< this.givenSlots.length; idx++) {
      if(this.givenSlots[idx] > currentHours) {
        nextGreaterIndex = idx;
        break;
      }
    }
    if(nextGreaterIndex > -1) {
      this.prepareTodaysSlots(nextGreaterIndex);
    }
    this.prepareTomorrowSlots();
    return this.timeSlots;
  }

  private prepareTodaysSlots(nextGreaterIndex: number) {
    for(let idx=nextGreaterIndex; idx<this.givenSlots.length; idx++) {
      let hour = this.givenSlots[idx];
      let slot = {
        day: 'Today',
        startTime: this.hourMappings[hour],
        endTime: this.hourMappings[hour+3]
      }
      this.timeSlots.push(slot);
    }
  }

  private prepareTomorrowSlots() {
    for(let givenSlot of this.givenSlots) {
      let slot = {
        day: 'Tomorrow',
        startTime: this.hourMappings[givenSlot],
        endTime: this.hourMappings[givenSlot+3]
      }
      this.timeSlots.push(slot);
    }
  }
}
