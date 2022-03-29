import { TestBed } from '@angular/core/testing';

import { PokemonIdGuard } from './pokemon-id.guard';

describe('PokemonIdGuard', () => {
  let guard: PokemonIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PokemonIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
