import { Component, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  pokemons: Pokemon[] = [];

  constructor(private pokemonsAPI: PokemonsService) { }

  ngOnInit() {
    this.pokemonsAPI.getPokemons(0);
    this.pokemons = this.pokemonsAPI.getListPokemons();
  }

  nextPage() {
    this.pokemonsAPI.getPokemons(this.pokemonsAPI.getNextOffset());
    this.pokemons = this.pokemonsAPI.getListPokemons();
  }

  previousPage() {
    this.pokemonsAPI.getPokemons(this.pokemonsAPI.getPreviousOffset());
    this.pokemons = this.pokemonsAPI.getListPokemons();
  }

  getNumbers() { // no sirve
    return this.pokemonsAPI.getPreviousOffset() + ' - ' + this.pokemonsAPI.getNextOffset();
  }

}
