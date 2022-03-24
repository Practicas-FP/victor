import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PokemonComponent } from './components/pokemon/pokemon.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FormsModule } from '@angular/forms';
import { PokedexComponent } from './components/pokedex/pokedex.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AlertComponent } from './components/alert/alert.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { PokemonIdGuard } from './guards/pokemon/pokemon-id.guard';
import { EvolutionsComponent } from './components/evolutions/evolutions.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: '', component: PokedexComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'evolutions', component: EvolutionsComponent },
  { path: 'pokemon/:id', component: PokemonComponent, canActivate: [PokemonIdGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PokemonComponent,
    NotFoundComponent,
    PokedexComponent,
    AlertComponent,
    EvolutionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),
    MDBBootstrapModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
