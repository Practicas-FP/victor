import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { FavoritePokemon } from '../models/pokemon-favorite.model';

@Injectable()
export class DataService {

  private url: string = 'https://accedex-decb9-default-rtdb.europe-west1.firebasedatabase.app/users/favorite-pokemon/';

  private userId: string;
  private pokemonsIdsDB: AngularFireList<FavoritePokemon>;

  private pokemonesFavs: FavoritePokemon[] = [];

  constructor(private db: AngularFireDatabase, private httpClient: HttpClient) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userId = user.uid;
  }

  getListFavoritePokemons(): AngularFireList<FavoritePokemon> {
    this.pokemonsIdsDB = this.db.list(`users/favorite-pokemon/${this.userId}`);
    return this.pokemonsIdsDB;
  }

  addFavoritePokemon(id: number) {
    this.pokemonsIdsDB = this.getListFavoritePokemons();
    this.pokemonsIdsDB.push({ pokemonId: String(id) })
      .then(() => window.alert('Pokemon added to favorites'))
      .catch(error =>  window.alert(error));

    const listObservable = this.pokemonsIdsDB.snapshotChanges();
    listObservable.subscribe();
  }

  deleteFavoritePokemon(key: string) {
    this.pokemonsIdsDB = this.getListFavoritePokemons();
    this.pokemonsIdsDB.remove(key)
      .then(() => window.alert('Pokemon removed from favorites'))
      .catch(error =>  window.alert(error));
  }

  /* No se esta utilizando */
  getPokemonesFavorites() {
    const observable: Observable<Object> = this.httpClient.get(`${this.url}${this.userId}.json`);

    observable.subscribe(pokemonesFavs => {
      console.log(pokemonesFavs);
    });
  }
}
