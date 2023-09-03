import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';
import { AuthorisationAdminGuard } from './authorisation-admin.guard';

describe('AuthorisationAdminGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    const guard: CanActivate = TestBed.inject(AuthorisationAdminGuard);
    expect(guard).toBeTruthy();
  });
});
