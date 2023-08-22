import { TestBed } from '@angular/core/testing';

import { LeavesUserService } from './leaves-user.service';

describe('LeavesUserService', () => {
  let service: LeavesUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeavesUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
