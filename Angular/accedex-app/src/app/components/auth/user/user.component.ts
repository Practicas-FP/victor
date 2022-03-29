import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { FavoritePokemon } from 'src/app/models/pokemon-favorite.model';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  config: any;

  constructor(public authService: AuthService, public dataService: DataService, public pokemonsAPI: PokemonsService) {
    this.pokemonsAPI.clearPokemons();

    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.pokemonsAPI.pokemons.length
    };
  }

  ngOnInit(): void {
    this.dataService.getListFavoritePokemons().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const pokeFav: FavoritePokemon = {
            $key: a.key,
            pokemonId: a.payload.val()?.pokemonId
          };

          return pokeFav;
        })
      )
    ).subscribe(pokesFavs => {

      pokesFavs.forEach(pokeFav => {
        if (pokeFav.pokemonId) {
          this.pokemonsAPI.getPokemonById(parseInt(pokeFav.pokemonId));
        }
      })

      console.log(this.pokemonsAPI.pokemons)
    });
  }

  pageChanged(event: any){
    this.config.currentPage = event;
  }
}
