import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { AuthorisationGuard } from './authorisation.guard';

describe('authorisationGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => AuthorisationGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
