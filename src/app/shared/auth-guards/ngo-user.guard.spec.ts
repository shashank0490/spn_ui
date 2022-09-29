import { TestBed } from '@angular/core/testing';

import { NgoUserGuard } from './ngo-user.guard';

describe('NgoUserGuard', () => {
  let guard: NgoUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NgoUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
