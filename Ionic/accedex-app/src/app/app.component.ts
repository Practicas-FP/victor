/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { map } from 'rxjs/internal/operators/map';
import { AuthService } from './services/auth.service';
import { FbService } from './services/fb.service';
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

  constructor(
    public authService: AuthService,
    public router: Router,
    public toastController: ToastController,
    public fbService: FbService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      // Check the dark mode of the logged in user
      this.fbService.getDarkMode();

      // Set dark mode
      this.checkDarkTheme();
    } else {
      // Check the dark mode of the operating system
      this.prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.darkMode = this.prefersDark.matches;

      // Set dark mode
      if (this.prefersDark.matches) {
        document.body.classList.toggle('dark');
      }

    }
  }

  findPokemonByName(name: string) {
    if (name) {
      this.router.navigate([`pokemon/` + name]);
    } else {
      this.presentToast('The name field cannot be empty.');
    }
  }

  checkDarkTheme() {
    this.fbService.getDarkMode().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const darkMode = a.payload.val();

          return darkMode;
        })
      )
    ).subscribe(darkMode => {
      if (darkMode.length) {
        console.log(darkMode[0]);
        this.fbService.darkMode = Boolean(darkMode[0]);

        if (darkMode[0]) {
          document.body.classList.toggle('dark');
          this.darkMode = Boolean(darkMode[0]);
        }
      }
    });
  }

  changeDarkMode() {
    if (this.authService.isLoggedIn) {
      //this.fbService.addDarkMode(!this.darkMode);
    }

    this.darkMode = !this.darkMode;
    document.body.classList.toggle('dark');
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
