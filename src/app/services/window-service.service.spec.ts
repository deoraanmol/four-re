import { TestBed } from '@angular/core/testing';

import { WindowServiceService } from './window-service.service';

describe('WindowServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowServiceService = TestBed.get(WindowServiceService);
    expect(service).toBeTruthy();
  });
});
