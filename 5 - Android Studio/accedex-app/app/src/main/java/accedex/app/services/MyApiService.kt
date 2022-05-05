package accedex.app.services

import accedex.app.jk.pokedex.PokedexResponse
import accedex.app.jk.pokemon.PokemonResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Url

interface MyApiService {

    @GET
    suspend fun getPokemons(@Url url: String): Response<PokedexResponse>

    @GET
    suspend fun getPokemonById(@Url url: String): Response<PokemonResponse>
}