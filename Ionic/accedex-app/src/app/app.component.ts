import { Component } from '@angular/core';
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
    { title: 'Profile', url: 'profile', icon: 'person' },
    { title: 'Log In', url: 'login', icon: 'log-in' },
    { title: 'Log Out', url: 'logout', icon: 'log-out' }
  ];

  constructor() { }
}
