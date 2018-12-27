import { TestBed } from '@angular/core/testing';

import { TestUserService } from './test-user.service';

describe('TestUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestUserService = TestBed.get(TestUserService);
    expect(service).toBeTruthy();
  });
});
