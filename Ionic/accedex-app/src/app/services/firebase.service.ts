/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { PokemonFavorite } from '../models/interfaces/pokemon-favorite.interface';

@Injectable()
export class FirebaseService {

  private userId: string;
  private firebaseList: AngularFireList<PokemonFavorite>;

  constructor(private db: AngularFireDatabase) {
    const user = JSON.parse(localStorage.getItem('user')!);
    this.userId = user.uid;
  }

  getListPokeFavs(): AngularFireList<PokemonFavorite> {
    this.firebaseList = this.db.list(`users/${this.userId}/favorite-pokemon`);
    return this.firebaseList;
  }

  addPokeFav(id: number) {
    this.firebaseList = this.getListPokeFavs();
    this.firebaseList.push({ pokemonId: String(id) })
      .then(() => {
        window.alert('Pokemon added to favorites');
      })
      .catch(error =>  {
        window.alert(error);
      });

    const listObservable = this.firebaseList.snapshotChanges();
    listObservable.subscribe();
  }

  deletePokeFav(key: string) {
    this.firebaseList = this.getListPokeFavs();
    this.firebaseList.remove(key)
      .then(() => {
        window.alert('Pokemon removed from favorites');
      })
      .catch(error => {
        window.alert(error);
      });
  }
}
