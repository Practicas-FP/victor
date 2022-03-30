/* eslint-disable @typescript-eslint/member-ordering */
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit {

  private id: number;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  // eslint-disable-next-line max-len
  constructor(private activatedRoute: ActivatedRoute, public toastController: ToastController, public pokeAPI: PokeapiService) { }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.pokeAPI.getPokemonById(this.id);
  }

  addFav() {
    this.presentToast('Pokemon added to favorite');
  }

  removeFav() {
    this.presentToast('Pokemon removed to favorite');
  }

  nextPoke() {

  }

  prevPoke() {

  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


}
