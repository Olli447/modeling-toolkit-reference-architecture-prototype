import { TestBed } from '@angular/core/testing';

import { ModellingToolkitService } from './modelling-toolkit.service';

describe('ModellingToolkitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModellingToolkitService = TestBed.get(ModellingToolkitService);
    expect(service).toBeTruthy();
  });
});
