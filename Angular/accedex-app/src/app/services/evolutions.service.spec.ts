/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EvolutionsService } from './evolutions.service';

describe('Service: Evolutions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvolutionsService]
    });
  });

  it('should ...', inject([EvolutionsService], (service: EvolutionsService) => {
    expect(service).toBeTruthy();
  }));
});
