/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private limit = 12;

  pokemon: Pokemon;
  pokemons: Pokemon[] = [];
  nextOffset: number;
  prevOffset: number;

  loadingData = true;
  noDataFound = false;

  pokeFavs: any[] = [];

  constructor() { }

  nextPage() {

  }

  prevPage() {

  }
}
