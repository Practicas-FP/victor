/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EvolutionClient, PokemonClient } from 'pokenode-ts';
import { map } from 'rxjs/operators';
import { Evolution } from '../models/evolution.model';
import { PokemonFavorite } from '../models/interfaces/pokemon-favorite.interface';
import { PokemonTypesDamage } from '../models/pokemon-type.model';
import { Pokemon } from '../models/pokemon.model';
import { FbService } from './fb.service';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private limit: number;

  pokemon: Pokemon;
  pokemons: Pokemon[] = [];
  nextOffset: number;
  prevOffset: number;

  loadingData = true;
  noDataFound = false;

  evolutions: Evolution[] = [];

  pokeFavs: PokemonFavorite[] = [];

  constructor(
    private router: Router,
    /* public firebaseService: FirebaseService */) {

    //this.getFavorites();
  }

  nextPage() {
    this.getPokemons(this.nextOffset, this.limit);
  }

  prevPage() {
    this.getPokemons(this.prevOffset, this.limit);
  }

  nextPoke() {
    this.router.navigateByUrl(`/pokemon/${this.pokemon.id + 1}`);
  }

  prevPoke() {
    if (this.pokemon.id > 1) {
      this.router.navigateByUrl(`/pokemon/${this.pokemon.id - 1}`);
    }
  }

  clearPokemon() {
    this.pokemon = null;
  }

  clearPokemons() {
    this.pokemons = [];
  }

  clearEvolutions() {
    this.evolutions = [];
  }

  /**
   * API Pokemones
   */
  getPokemons(offset: number, limit: number) {
    this.limit = limit;
    this.clearPokemons();
    this.loadingData = true;

    (async () => {
      const api = new PokemonClient();

      this.loadingData = true;

      await api
        .listPokemons(offset, limit)
        .then((data) => {
          if (data.next) {
            this.nextOffset = Number(data.next.substring(data.next.search('=') + 1, data.next.search('&')));
          }

          if (data.previous) {
            this.prevOffset = Number(data.previous.substring(data.previous.search('=') + 1, data.previous.search('&')));
          }

          if (data.results) {
            data.results.forEach(pokemon => this.getPokemonForCardById(Number(pokemon.url.split('/')[6])));
          }
        })
        .catch((error) => {
          this.noDataFound = true;
          this.loadingData = false;
          console.error(error);
        })
        .finally(() => {
          this.loadingData = false;
        });
    })();
  }

  getPokemonForCardById(id: number) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonById(id)
        .then((data) => {

          const found = this.pokeFavs.find(pokeFav => pokeFav.pokemonId === String(data.id));

          this.pokemons.push(new Pokemon(
            data.id,
            data.name,
            data.sprites.front_default,
            data.types,
            false, [], 0, 0, [], [], null, 0,
            found ? true : false,
            found ? found.$key : ''
          ));
        })
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        });
    })();
  }

  getPokemonById(id: number) {
    this.clearPokemon();
    this.loadingData = true;

    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonById(id)
        .then((data) => this.getJSONDataPokemon(data))
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => {
          this.loadingData = false;
        });
    })();
  }

  getPokemonByName(name: string) {
    this.clearPokemon();
    this.loadingData = true;

    (async () => {
      const api = new PokemonClient();

      await api
        .getPokemonByName(name)
        .then((data) => this.getJSONDataPokemon(data))
        .catch((error) => {
          this.noDataFound = true;
          console.error(error);
        })
        .finally(() => {
          this.loadingData = false;
        });
    })();
  }

  private getJSONDataPokemon(data: any) {

    const found = this.pokeFavs.find(pokeFav => pokeFav.pokemonId === String(data.id));

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
      this.getTypeDamageFromAndTo(Number(type.type.url.split('/')[6]));
    });
  }

  private getTypeDamageFromAndTo(id: number) {
    (async () => {
      const api = new PokemonClient();

      await api
        .getTypeById(id)
        .then((data) => {
          this.pokemon.setTypeDamage(new PokemonTypesDamage(
            data.name,
            data.damage_relations.double_damage_from,
            data.damage_relations.double_damage_to,
            data.damage_relations.half_damage_from,
            data.damage_relations.half_damage_to,
            data.damage_relations.no_damage_from,
            data.damage_relations.no_damage_to
          ));

          this.pokemons.push(this.pokemon);
        })
        .catch((error) => console.log(error));
    })();
  }

  // Get pokemones favorites
/*   getFavorites() {
    // comprobra aqui si es favorito o no
    this.firebaseService.getListPokeFavs().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const pokeFav: PokemonFavorite = {
            $key: a.key,
            pokemonId: a.payload.val()?.pokemonId
          };

          return pokeFav;
        })
      )
    ).subscribe(pokesFavs => {

      pokesFavs.forEach(pokeFav => {
        if (pokeFav.pokemonId) {
          this.pokeFavs.push({
            $key: pokeFav.$key,
            pokemonId: pokeFav.pokemonId
          });
        }
      });
    });
  } */


  /**
   * API Evolutions
   */
  getEvolutions(offset: number, limit: number) {
    this.limit = limit;
    this.clearEvolutions();
    this.loadingData = true;

    (async () => {
      const api = new EvolutionClient();

      this.loadingData = true;

      await
        api.listEvolutionChains(offset, this.limit)
          .then(data => {
            if (data.next) {
              this.nextOffset = Number(data.next.substring(data.next.search('=') + 1, data.next.search('&')));
            }

            if (data.previous) {
              this.prevOffset = Number(data.previous.substring(data.previous.search('=') + 1, data.previous.search('&')));
            }

            if (data.results) {
              data.results.forEach(evolutionChain => this.getEvolutionById(Number(evolutionChain.url.split('/')[6])));
            }
          })
          .catch(error => {
            this.noDataFound = true;
            this.loadingData = false;
            console.error(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
    })();
  }

  private getEvolutionById(id: number) {
    (async () => {
      const api = new EvolutionClient();

      await
        api.getEvolutionChainById(id)
          .then(data => {
            this.evolutions.push(new Evolution(data.id, data.chain, data.baby_trigger_item));
          })
          .catch(error => {
            this.noDataFound = true;
            console.error(error);
          })
          .finally(() => {
            this.loadingData = false;
          });
    })();
  }
}
