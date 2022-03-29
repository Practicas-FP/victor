import { Component, OnInit } from '@angular/core';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  pokemonsAPI: PokemonsService;

  constructor(pokemonsAPI: PokemonsService) {
    this.pokemonsAPI = pokemonsAPI;
  }

  ngOnInit() {
    this.pokemonsAPI.getPokemons(0);
  }

  nextPage() {
    this.pokemonsAPI.getPokemons(this.pokemonsAPI.getNextOffset());
  }

  previousPage() {
    this.pokemonsAPI.getPokemons(this.pokemonsAPI.getPreviousOffset());
  }

  getNumbers() { // no sirve
    return this.pokemonsAPI.getPreviousOffset() + ' - ' + this.pokemonsAPI.getNextOffset();
  }

}
