import { Injectable } from '@angular/core';
import { PokemonClient } from 'pokenode-ts';
import { map } from 'rxjs';
import { FavoritePokemon } from '../models/pokemon-favorite.model';
import { PokemonType } from '../models/pokemon-type.model';
import { Pokemon } from '../models/pokemon.model';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PokemonsService {

  pokemon: Pokemon;
  pokemons: Pokemon[] = [];
  private nextOffset: number = 0;
  private previousOffset: number = 0;
  private limit: number = 12;
  loadingData: boolean = true;
  noDataFound: boolean = false;
  pokemonesFavorites: FavoritePokemon[] = [];

  private loaderServiceActive: boolean = false;

  show() {
    this.loadingData = true;
  }

  hide() {
    this.loadingData = false;
  }

  findPokemonById(index: number) {
    return this.pokemons.find(pokemon => pokemon.getId() === index);
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

  constructor(private dataService: DataService) {
    this.getFavorites();
  }

  getPokemons(offset: number) {
    this.clearPokemons();

    (async () => {
      const api = new PokemonClient();

      if (!this.loaderServiceActive) this.loadingData = true;

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
          if (!this.loaderServiceActive) this.loadingData = false;

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
            0,
            false,
            ''
          )))
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => { if (!this.loaderServiceActive) this.loadingData = false });
    })();
  }

  getMoreDataPokemonById(id: number) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonById(id)
        .then((data) => this.getJSONDataPokemo(data))
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => { if (!this.loaderServiceActive) this.loadingData = false })
    })();
  }

  getPokemonByName(name: string) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(name)
        .then((data) => this.getJSONDataPokemo(data))
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => { if (!this.loaderServiceActive) this.loadingData = false });
    })();
  }

  getTypeDamageFromAndTo(id: number) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getTypeById(id)
        .then((data) => this.pokemon.setTypeDamage(new PokemonType(
          data.name,
          data.damage_relations.double_damage_from,
          data.damage_relations.double_damage_to,
          data.damage_relations.half_damage_from,
          data.damage_relations.half_damage_to,
          data.damage_relations.no_damage_from,
          data.damage_relations.no_damage_to
        )))
        .catch((error) => console.log(error));
    })();
  }

  private getJSONDataPokemo(data: any) {

    const found = this.pokemonesFavorites.find(pokeFav => pokeFav.pokemonId === String(data.id));

    this.pokemon = new Pokemon(
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
      data.base_experience,
      found ? true : false,
      found ? found.$key : ''
    );

    data.types.forEach((type: any) => {
      this.getTypeDamageFromAndTo(parseInt(type.type.url.split('/')[6]));
    });

  }

  getFavorites() {
    // comprobra aqui si es favorito o no
    this.dataService.getListFavoritePokemons().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const pokeFav: FavoritePokemon = {
            $key: a.key,
            pokemonId: a.payload.val()?.pokemonId
          };

          //console.log(pokeFav)

          return pokeFav;
        })
      )
    ).subscribe(pokesFavs => {

      pokesFavs.forEach(pokeFav => {
        if (pokeFav.pokemonId) {
          this.pokemonesFavorites.push({
            $key: pokeFav.$key,
            pokemonId: pokeFav.pokemonId
          });
        }
      });
    });
  }
}
