import { TestBed } from '@angular/core/testing';

import { TimeSlotServiceService } from './time-slot-service.service';

describe('TimeSlotServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeSlotServiceService = TestBed.get(TimeSlotServiceService);
    expect(service).toBeTruthy();
  });
});
