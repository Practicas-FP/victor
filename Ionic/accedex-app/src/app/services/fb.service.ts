/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import { PokemonFavorite } from '../models/interfaces/pokemon-favorite.interface';
import { UserPhoto } from '../models/interfaces/user-photo.interface';

@Injectable()
export class FbService {

  private userId: string;
  private firebaseList: AngularFireList<PokemonFavorite>;

  constructor(
    private db: AngularFireDatabase,
    public firestore: AngularFirestore,
    public toastController: ToastController) {

    const user = JSON.parse(localStorage.getItem('user')!);
    this.userId = user.uid;
  }

  // POKEMONS
  getListPokeFavs(): AngularFireList<PokemonFavorite> {
    this.firebaseList = this.db.list(`users/${this.userId}/favorite-pokemon`);
    return this.firebaseList;
  }

  addPokeFav(id: number) {
    this.firebaseList = this.getListPokeFavs();
    this.firebaseList.push({ pokemonId: String(id) })
      .then(() => {
        this.presentToast('Pokemon added to favorite');
      })
      .catch(error => {
        this.presentToast(error.message);
      });

    const listObservable = this.firebaseList.snapshotChanges();
    listObservable.subscribe();
  }

  deletePokeFav(key: string) {
    this.firebaseList = this.getListPokeFavs();
    this.firebaseList.remove(key)
      .then(() => {
        this.presentToast('Pokemon removed to favorite');
      })
      .catch(error => {
        this.presentToast(error.message);
      });
  }

  // USER IMAGE
  private firebaseUserPhoto: AngularFireList<UserPhoto>;

  getUserPhoto(): AngularFireList<UserPhoto> {
    this.firebaseUserPhoto = this.db.list(`users/${this.userId}/photo`);
    return this.firebaseUserPhoto;
  }

  addUserPhoto(userPhoto: UserPhoto) {
    this.firebaseUserPhoto = this.getUserPhoto();
    this.firebaseUserPhoto.remove();
    this.firebaseUserPhoto.push(userPhoto)
      .then(() => {
        this.presentToast('Photo updated successfully');
      })
      .catch((error) => {
        this.presentToast(error.message);
      });
  }

  deleteUserPhoto(key: string) {
    this.firebaseUserPhoto = this.getUserPhoto();
    this.firebaseUserPhoto.remove(key)
      .then(() => { })
      .catch((error) => {
        this.presentToast(`Failed to delete photo: ${error.message}`);
      });
  }

  // TOAST
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
