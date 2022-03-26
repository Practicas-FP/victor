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
import { NgxPaginationModule } from 'ngx-pagination';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { PokemonsService } from './services/pokemons.service';
import { EvolutionsService } from './services/evolutions.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { LoginRegisterComponent } from './components/auth/login-register/login-register.component';
import { AuthService } from './services/auth.service';
import { VerifyEmailComponent } from './components/auth/verify-email/verify-email.component';
import { AuthGuard } from './interceptors/auth.guard';
import { UserComponent } from './components/auth/user/user.component';

const routes: Routes = [
  //{ path: '', component: HomeComponent },
  { path: '', redirectTo: '/pokedex', pathMatch: 'full' },
  { path: 'pokedex', component: PokedexComponent, canActivate: [AuthGuard] },
  { path: 'evolutions', component: EvolutionsComponent, canActivate: [AuthGuard] },
  { path: 'pokemon/:id', component: PokemonComponent, canActivate: [AuthGuard, PokemonIdGuard] },
  { path: 'login-register', component: LoginRegisterComponent },
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
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
    EvolutionsComponent,
    LoginRegisterComponent,
    VerifyEmailComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    MDBBootstrapModule.forRoot(),
    NgCircleProgressModule.forRoot({
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [
    PokemonsService,
    EvolutionsService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
