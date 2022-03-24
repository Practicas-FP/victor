import { Component, OnInit } from '@angular/core';
import { EvolutionsService } from 'src/app/services/evolutions.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.css']
})
export class EvolutionsComponent implements OnInit {

  evolutionsAPI: EvolutionsService;
  pokemonsAPI: PokemonsService;

  constructor(evolutionsAPI: EvolutionsService, pokemonsAPI: PokemonsService) {
    this.evolutionsAPI = evolutionsAPI;
    this.pokemonsAPI = pokemonsAPI;
  }

  ngOnInit() {
    this.evolutionsAPI.getEvolutions(0);
  }

}
