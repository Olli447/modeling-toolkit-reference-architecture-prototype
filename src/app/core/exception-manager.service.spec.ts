import { TestBed } from '@angular/core/testing';

import { ExceptionManagerService } from './exception-manager.service';

describe('ExceptionManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExceptionManagerService = TestBed.get(ExceptionManagerService);
    expect(service).toBeTruthy();
  });
});
