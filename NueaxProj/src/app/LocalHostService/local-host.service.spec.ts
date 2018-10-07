import { TestBed, inject } from '@angular/core/testing';

import { LocalHostService } from './local-host.service';

describe('LocalHostService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalHostService]
    });
  });

  it('should be created', inject([LocalHostService], (service: LocalHostService) => {
    expect(service).toBeTruthy();
  }));
});
