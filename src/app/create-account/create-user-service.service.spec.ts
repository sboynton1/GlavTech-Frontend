import { TestBed } from '@angular/core/testing';

import { CreateUserService } from './create-user-service.service';

describe('CreateUserServiceService', () => {
  let service: CreateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});