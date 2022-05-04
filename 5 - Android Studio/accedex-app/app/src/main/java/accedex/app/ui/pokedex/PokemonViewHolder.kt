package accedex.app.ui.pokedex

import accedex.app.databinding.CardPokemonBinding
import android.view.View
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso
import accedex.app.jk.pokedex.Result

class PokemonViewHolder(view: View): RecyclerView.ViewHolder(view) {

    private val binding = CardPokemonBinding.bind(view)

    fun bind(pokemon: Result, listener: PokemonAdapter.onItemClickListener) {
        val id = Integer.parseInt(pokemon.url.split("/")[6])

        Picasso.get().load("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$id.png").into(binding.ivPokemon)
        binding.tvName.text = "#$id ${pokemon.name.capitalize()}"

        itemView.setOnClickListener {
            listener.onItemClick(id)
        }
    }
}