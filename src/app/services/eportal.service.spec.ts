import { TestBed } from '@angular/core/testing';

import { EportalService } from './eportal.service';

describe('EportalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EportalService = TestBed.get(EportalService);
    expect(service).toBeTruthy();
  });
});
