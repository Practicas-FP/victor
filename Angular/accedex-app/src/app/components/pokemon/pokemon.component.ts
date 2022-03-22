import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  private id: number;
  private name: string;
  pokemons: Pokemon[] = [];

  constructor(private pokemonsAPI: PokemonsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    if (isNaN(this.route.snapshot.params['id'])) {
      this.name = this.route.snapshot.params['id'];

      this.pokemonsAPI.getPokemonByName(this.name.toLocaleLowerCase());
    } else {
      this.id = this.route.snapshot.params['id'];

      this.pokemonsAPI.getMoreDataPokemonById(this.id);
    }

    this.pokemonsAPI.clearPokemons();
    this.pokemons = this.pokemonsAPI.getListPokemons();
  }

}
