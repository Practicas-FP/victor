import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  private pokemon: Pokemon;
  private pokemons: Pokemon[] = [];
  private nextOffset: number = 0;
  private previousOffset: number = 0;
  private limit: number = 12
  loadingData: boolean = true;
  noDataFound: boolean = false;

  findPokemonById(index: number) {
    return this.pokemons.find(pokemon => pokemon.getId() === index);
  }

  getPokemon() {
    return this.pokemon;
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

  clearPokemons() {
    this.pokemons = [];
  }

  constructor() { }

  getPokemons(offset: number) {
    this.clearPokemons();

    (async () => {
      const api = new PokemonClient();

      this.loadingData = true;

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
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => {
          this.loadingData = false;

          this.pokemons.sort(function (a, b) {
            return a.getId() - b.getId();
          });
        });
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
            data.types,
            false,
            [],
            0,
            0,
            [],
            [],
            null,
            0
          )))
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => this.loadingData = false);
    })();
  }

  getMoreDataPokemonById(id: number) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonById(id)
        .then((data) => {
          this.pokemons.push(this.getJSONDataPokemo(data));
        })
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => this.loadingData = false)
    })();
  }

  getPokemonByName(name: string) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(name)
        .then((data) => this.pokemons.push(this.getJSONDataPokemo(data)))
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => this.loadingData = false);
    })();
  }

  private getJSONDataPokemo(data: any): Pokemon {
    return new Pokemon(
      data.id,
      data.name,
      data.sprites.front_default,
      data.types,
      true,
      data.abilities,
      data.height,
      data.weight,
      data.stats,
      data.moves,
      data.sprites,
      data.base_experience
    );
  }
}
