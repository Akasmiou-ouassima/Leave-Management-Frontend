import { TestBed } from '@angular/core/testing';
import { CanActivate, Router } from '@angular/router';

import { AuthorisationRespoGuard } from './authorisation-respo.guard';

describe('AuthorisationRespoGuard', () => {
  let guard: AuthorisationRespoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthorisationRespoGuard, Router]
    });
    guard = TestBed.inject(AuthorisationRespoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
