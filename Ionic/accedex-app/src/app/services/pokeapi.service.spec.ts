/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PokeapiService } from './pokeapi.service';

describe('Service: Pokeapi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokeapiService]
    });
  });

  it('should ...', inject([PokeapiService], (service: PokeapiService) => {
    expect(service).toBeTruthy();
  }));
});
