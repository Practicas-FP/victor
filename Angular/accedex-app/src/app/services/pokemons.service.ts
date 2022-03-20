import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  //private pokemon: Pokemon;
  private pokemons: Pokemon[] = [];
  private nextPage: string = '';
  private previousPage: string = '';

  getPokemon(index: number) {
    //return this.pokemons.indexOf(index);
  }

  getListPokemons() {
    return this.pokemons;
  }

  constructor() { }

  getPokemons() {
    (async () => {
      const api = new PokemonClient();

      await api
        .listPokemons(0, 12)
        .then((data) => {
          if (data.next) this.nextPage = data.next;
          if (data.previous) this.previousPage = data.previous;

          // Crear el array de pokemons
          if (data.results) {
            data.results.forEach(pokemon => this.getPokemonById(parseInt(pokemon.url.split('/')[6])));
          }
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
            [
              data.types[0].type.name
            ]
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
