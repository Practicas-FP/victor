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

  constructor(public authService: AuthService, public router: Router) { }

  findPokemonByName(name: string) {
    this.router.navigate([`pokemon/` + name]);
  }
}
