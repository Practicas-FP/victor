/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public appPages = [
    { title: 'Pokedex', url: 'pokedex', icon: 'book' },
    { title: 'Evolutions', url: 'evolutions', icon: 'analytics' },
    { title: 'Favorites', url: 'favorites', icon: 'heart' },
    { title: 'Profile', url: 'profile', icon: 'person' }
  ];

  darkMode: boolean;
  prefersDark;
  //private darkModeSt = 'DarkMode';

  constructor(public authService: AuthService, public router: Router, public toastController: ToastController) { }

  ngOnInit() {
    this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = this.prefersDark.matches;

    this.checkDarkTheme();


    /*this.darkMode = Boolean(localStorage.getItem(this.darkModeSt));
    console.log(this.darkMode);

    if (this.darkMode) {
      document.body.classList.toggle('dark');
    }*/
  }

  findPokemonByName(name: string) {
    if (name) {
      this.router.navigate([`pokemon/` + name]);
    } else {
      this.presentToast('The name field cannot be empty.');
    }
  }

  checkDarkTheme() {
    if (this.prefersDark.matches) {
      document.body.classList.toggle('dark');
    }
  }

  changeDarkMode() {
    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');

    //localStorage.setItem(this.darkModeSt, String(this.darkMode));
  }

  // Toast
  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
