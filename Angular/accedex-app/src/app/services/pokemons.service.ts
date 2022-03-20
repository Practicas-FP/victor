import { Injectable } from '@angular/core';
import { Pokemon, PokemonClient } from 'pokenode-ts';
import { PokemonList } from '../models/pokemon-list.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  // para poner la foto a partir de la peticion esta
  // raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png

  //private pokemon: Pokemon;
  private pokemons: PokemonList[] = [];
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
            data.results.forEach(pokemon => this.pokemons.push(new PokemonList(
              parseInt(pokemon.url.split('/')[6]),
              'Name invent',
              pokemon.url
            )));
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
        .then((data) => console.log(data)) // ver si crear un nuevo objeto pokemon o usar el que viene en la libreria
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
