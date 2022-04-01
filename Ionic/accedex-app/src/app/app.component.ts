import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Pokedex', url: 'pokedex', icon: 'book' },
    { title: 'Evolutions', url: 'evolutions', icon: 'analytics' },
    { title: 'Favorites', url: 'favorites', icon: 'heart' },
    { title: 'Profile', url: 'profile', icon: 'person' }
  ];

  public darkMode: boolean;
  private darkModeSt = 'darkMode';

  constructor(public authService: AuthService, public router: Router) {
    if (localStorage.getItem(this.darkModeSt)) {
      this.darkMode = Boolean(localStorage.getItem(this.darkModeSt));

      console.log(`Al cargar: ${localStorage.getItem(this.darkModeSt)}`);
    }
  }

  findPokemonByName(name: string) {
    this.router.navigate([`pokemon/` + name]);
  }

  changeMode(value: string) {
    console.log(`Antes de guardar: ${value}`);

    localStorage.setItem(this.darkModeSt, this.darkMode ? '1' : '0');

    console.log(localStorage.getItem(this.darkModeSt));
  }
}
