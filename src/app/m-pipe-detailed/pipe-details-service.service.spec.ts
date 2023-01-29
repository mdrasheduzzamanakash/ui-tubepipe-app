import { TestBed } from '@angular/core/testing';

import { PipeDetailsServiceService } from './pipe-details-service.service';

describe('PipeDetailsServiceService', () => {
  let service: PipeDetailsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipeDetailsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
