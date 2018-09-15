import { TestBed } from '@angular/core/testing';

import { ContentCheckManagerService } from './content-check-manager.service';

describe('ContentCheckManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ContentCheckManagerService = TestBed.get(ContentCheckManagerService);
    expect(service).toBeTruthy();
  });
});
