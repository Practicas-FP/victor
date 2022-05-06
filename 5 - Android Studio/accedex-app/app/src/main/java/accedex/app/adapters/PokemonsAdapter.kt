package accedex.app.adapters

import accedex.app.R
import accedex.app.databinding.CardPokemonBinding
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import accedex.app.jk.pokedex.Result
import android.view.View
import com.squareup.picasso.Picasso

class PokemonsAdapter(private val pokemons: List<Result>): RecyclerView.Adapter<PokemonsAdapter.PokemonViewHolder>() {

    private lateinit var mListener: onItemClickListener

    class PokemonViewHolder(view: View): RecyclerView.ViewHolder(view) {

        private val binding = CardPokemonBinding.bind(view)

        fun bind(pokemon: Result, listener: onItemClickListener) {
            val id = Integer.parseInt(pokemon.url.split("/")[6])

            Picasso.get().load("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$id.png").into(binding.ivPokemon)
            binding.tvName.text = "#$id ${pokemon.name.capitalize()}"

            itemView.setOnClickListener {
                listener.onItemClick(id)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): PokemonViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        return PokemonViewHolder(layoutInflater.inflate(R.layout.card_pokemon, parent, false))
    }

    override fun onBindViewHolder(holder: PokemonViewHolder, position: Int) {
        val item = pokemons[position];
        holder.bind(item, mListener)
    }

    override fun getItemCount(): Int = pokemons.size

    interface onItemClickListener {
        fun onItemClick(id: Int)
    }

    fun setOnItemClickListener(listener: onItemClickListener) {
        mListener = listener
    }
}