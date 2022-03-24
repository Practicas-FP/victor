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
  disabledPrevious: boolean = false;
  alert: boolean = false;
  alertMessage: string;
  alertColor: string;
  pokemonsAPI: PokemonsService;

  constructor(pokemonsAPI: PokemonsService, private router: Router, private route: ActivatedRoute) {
    this.pokemonsAPI = pokemonsAPI;
  }

  ngOnInit() {
    this.getData(0);
  }

  previous() {
    if (this.pokemonsAPI.pokemon.getId() <= 1) {
      this.alertMessage = 'This is the first pokemon';
      this.alertColor = 'alert-warning';
      this.alert = true;
      return;
    }

    this.router.navigateByUrl(`/pokemon/${this.pokemonsAPI.pokemon.getId() - 1}`);

    this.getData(this.pokemonsAPI.pokemon.getId() - 1);
  }

  next() {
    this.router.navigateByUrl(`/pokemon/${this.pokemonsAPI.pokemon.getId() + 1}`);

    this.getData(this.pokemonsAPI.pokemon.getId() + 1);
  }

  getAlertVisibility(visible: boolean) {
    this.alert = visible;
  }

  private getData(change: number) {
    this.alert = false;
    this.pokemonsAPI.clearPokemons();

    if (change) {
      this.pokemonsAPI.getMoreDataPokemonById(change);
    } else {
      if (isNaN(this.route.snapshot.params['id'])) {
        this.name = this.route.snapshot.params['id'];

        this.pokemonsAPI.getPokemonByName(this.name.toLocaleLowerCase());
      } else {
        this.id = this.route.snapshot.params['id'];

        this.pokemonsAPI.getMoreDataPokemonById(this.id);
      }
    }
  }
}
