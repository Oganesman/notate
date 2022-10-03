import { TestBed } from '@angular/core/testing';

import { RegestrationService } from './regestration.service';

describe('RegestrationService', () => {
  let service: RegestrationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegestrationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
