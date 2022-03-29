import { Component, OnInit } from '@angular/core';
import { EvolutionsService } from 'src/app/services/evolutions.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.component.html',
  styleUrls: ['./evolutions.component.css']
})
export class EvolutionsComponent implements OnInit {

  config: any;
  evolutionsAPI: EvolutionsService;
  pokemonsAPI: PokemonsService;

  constructor(evolutionsAPI: EvolutionsService, pokemonsAPI: PokemonsService) {
    this.evolutionsAPI = evolutionsAPI;
    this.pokemonsAPI = pokemonsAPI;

    this.config = {
      itemsPerPage: 4,
      currentPage: 1,
      totalItems: this.evolutionsAPI.evolutions.length
    };
  }

  ngOnInit() {
    this.evolutionsAPI.getEvolutions(0);
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }

}
