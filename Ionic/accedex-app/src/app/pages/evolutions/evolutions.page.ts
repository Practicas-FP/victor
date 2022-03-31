import { Component, OnInit } from '@angular/core';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-evolutions',
  templateUrl: './evolutions.page.html',
  styleUrls: ['./evolutions.page.scss'],
})
export class EvolutionsPage implements OnInit {

  constructor(public pokeAPI: PokeapiService) { }

  ngOnInit() {
  }

}
