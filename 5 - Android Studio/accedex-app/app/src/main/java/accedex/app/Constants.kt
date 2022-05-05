package accedex.app

import android.content.Context
import android.content.res.Resources
import android.widget.Toast
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class Constants {

    companion object {
        const val URL = "https://pokeapi.co/api/v2/"
    }

    fun getRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl(URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    fun showError(context: Context, msg: String) {
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
    }

    fun getColor(color: String, resources: Resources): Int {
        return when (color) {
            "grass" -> resources.getColor(R.color.grass)
            "fire" -> resources.getColor(R.color.fire)
            "water" -> resources.getColor(R.color.water)
            "normal" -> resources.getColor(R.color.normal)
            "flying" -> resources.getColor(R.color.flying)
            "bug" -> resources.getColor(R.color.bug)
            "poison" -> resources.getColor(R.color.poison)
            "electric" -> resources.getColor(R.color.electric)
            "ground" -> resources.getColor(R.color.ground)
            "fighting" -> resources.getColor(R.color.fighting)
            "psychic" -> resources.getColor(R.color.psychic)
            "rock" -> resources.getColor(R.color.rock)
            "ice" -> resources.getColor(R.color.ice)
            "ghost" -> resources.getColor(R.color.ghost)
            "dragon" -> resources.getColor(R.color.dragon)
            "dark" -> resources.getColor(R.color.dark)
            "steel" -> resources.getColor(R.color.steel)
            "fairy" -> resources.getColor(R.color.fairy)
            "gray" -> resources.getColor(R.color.gray)
            else -> resources.getColor(R.color.no_color)
        }
    }
}