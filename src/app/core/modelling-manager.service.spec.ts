import { TestBed } from '@angular/core/testing';

import { ModellingManagerService } from './modelling-manager.service';

describe('ModellingManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModellingManagerService = TestBed.get(ModellingManagerService);
    expect(service).toBeTruthy();
  });
});
