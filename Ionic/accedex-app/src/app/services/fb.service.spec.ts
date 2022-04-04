/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FbService } from './fb.service';

describe('Service: Firebase', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FbService]
    });
  });

  it('should ...', inject([FbService], (service: FbService) => {
    expect(service).toBeTruthy();
  }));
});