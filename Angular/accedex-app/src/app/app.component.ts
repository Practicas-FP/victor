import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { PokemonsService } from './services/pokemons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Accedex';
  pokemonSearch: string;

  constructor(public authService: AuthService) { }

}
