import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PokemonFavorite } from 'src/app/models/interfaces/pokemon-favorite.interface';
import { FbService } from 'src/app/services/fb.service';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(
    public pokeAPI: PokeapiService,
    public firebaseService: FbService) { }

  ngOnInit() {
    this.pokeAPI.clearPokemons();

    this.firebaseService.getListPokeFavs().snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const pokeFav: PokemonFavorite = {
            $key: a.key,
            pokemonId: a.payload.val()?.pokemonId
          };

          return pokeFav;
        })
      )
    ).subscribe(pokesFavs => {

      pokesFavs.forEach(pokeFav => {
        if (pokeFav.pokemonId) {
          this.pokeAPI.getPokemonForCardById(Number(pokeFav.pokemonId));
        }
      });
    });
  }
}
