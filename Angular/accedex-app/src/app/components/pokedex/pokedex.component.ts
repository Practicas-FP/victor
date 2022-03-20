import { Component, OnInit } from '@angular/core';
import { PokemonList } from 'src/app/models/pokemon-list.model';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})
export class PokedexComponent implements OnInit {

  pokemons: PokemonList[] = [];

  constructor(private pokemonsAPI: PokemonsService) { }

  ngOnInit() {
    this.pokemonsAPI.getPokemons();
    this.pokemons = this.pokemonsAPI.getListPokemons();
  }

}
