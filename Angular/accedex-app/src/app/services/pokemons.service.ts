import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  //private pokemon: Pokemon;
  private pokemons: Pokemon[] = [];
  private nextOffset: number = 0;
  private previousOffset: number = 0;
  private limit: number = 12

  getPokemon(index: number) {
    //return this.pokemons.indexOf(index);
  }

  getListPokemons() {
    return this.pokemons;
  }

  getNextOffset() {
    return this.nextOffset;
  }

  getPreviousOffset() {
    return this.previousOffset;
  }

  constructor() { }

  getPokemons(offset: number) {
    this.pokemons = [];

    (async () => {
      const api = new PokemonClient();

      await api
        .listPokemons(offset, this.limit)
        .then((data) => {
          if (data.next)
            this.nextOffset = parseInt(data.next.substring(data.next.search('=') + 1, data.next.search('&')));

          if (data.previous)
            this.previousOffset = parseInt(data.previous.substring(data.previous.search('=') + 1, data.previous.search('&')));

          if (data.results)
            data.results.forEach(pokemon => this.getPokemonById(parseInt(pokemon.url.split('/')[6])));
        })
        .catch((error) => console.error(error));
    })();
  }

  getPokemonById(id: number) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonById(id)
        .then((data) =>
          this.pokemons.push(new Pokemon(
            data.id,
            data.name,
            data.sprites.front_default,
            data.types
          )))
        .catch((error) => console.error(error));
    })();
  }

  getPokemonByName(name: string) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(name)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    })();
  }
}
