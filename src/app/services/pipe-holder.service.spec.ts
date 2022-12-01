import { TestBed } from '@angular/core/testing';

import { PipeHolderService } from './pipe-holder.service';

describe('PipeHolderService', () => {
  let service: PipeHolderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PipeHolderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
