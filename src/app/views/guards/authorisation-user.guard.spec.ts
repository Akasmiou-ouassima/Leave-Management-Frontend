import { TestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';

import { AuthorisationUserGuard } from './authorisation-user.guard';

describe('AuthorisationUserGuard', () => {
  let guard: AuthorisationUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorisationUserGuard, Router] 
    });
    guard = TestBed.inject(AuthorisationUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
