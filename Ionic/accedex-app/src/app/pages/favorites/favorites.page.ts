import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { PokemonFavorite } from 'src/app/models/interfaces/pokemon-favorite.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(
    public pokeAPI: PokeapiService,
    public firebaseService: FirebaseService) { }

  ngOnInit() {
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
          this.pokeAPI.getPokemonById(Number(pokeFav.pokemonId));
        }
      });

      console.log(this.pokeAPI.pokemons);
    });
  }
}
