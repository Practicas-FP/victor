package accedex.app.services

import accedex.app.jk.pokedex.PokedexResponse
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Url

interface MyApiService {

    companion object {
        const val URL = "https://pokeapi.co/api/v2/"
    }

    @GET
    suspend fun getPokemons(@Url url: String): Response<PokedexResponse>

    //@GET("pokemon/{param}")
    //fun getUsersById(@Path("param")param: String): Response<PokemonResponse>
}