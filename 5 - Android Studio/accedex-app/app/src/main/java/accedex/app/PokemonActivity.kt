package accedex.app

import accedex.app.adapters.ImagesAdapter
import accedex.app.adapters.StatsAdapter
import accedex.app.databinding.ActivityPokemonBinding
import accedex.app.jk.pokemon.PokemonResponse
import accedex.app.jk.pokemon.Stat
import accedex.app.services.MyApiService
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PokemonActivity : AppCompatActivity() {

    private var id: Int = 0

    private lateinit var binding: ActivityPokemonBinding
    private lateinit var constants: Constants

    private val imagesList = mutableListOf<String>()
    private val statsList = mutableListOf<Stat>()

    private lateinit var imagesAdapter: ImagesAdapter
    private lateinit var statsAdapter: StatsAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPokemonBinding.inflate(layoutInflater)
        setContentView(binding.root)

        constants = Constants()

        setUI()
        getPokemon()
    }

    private fun setUI() {
        // Images Adapter
        imagesAdapter = ImagesAdapter(imagesList)
        binding.rvImages.layoutManager = LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        binding.rvImages.adapter = imagesAdapter

        // Stats Adapter
        statsAdapter = StatsAdapter(statsList)
        binding.rvStats.layoutManager = GridLayoutManager(this, 2)
        binding.rvStats.adapter = statsAdapter

        // Favorite Btn
        binding.fabFav.setOnClickListener {

        }
    }

    private fun getPokemon() {
        id = intent.getIntExtra("ID", 0)

        CoroutineScope(Dispatchers.IO).launch {
            val call = constants.getRetrofit().create(MyApiService::class.java)
                .getPokemonById("pokemon/$id")
            var response = call.body()

            runOnUiThread {
                if (response != null) {
                    setData(response)
                } else {
                    constants.showError(this@PokemonActivity, getString(R.string.no_pokemon_found))
                }
            }
        }
    }

    private fun setData(response: PokemonResponse) {
        title = "#${response.id} ${response.name.capitalize()}"

        // Set Images
        imagesList.clear()
        imagesList.add(response.sprites.front_default)
        imagesList.add(response.sprites.front_shiny)
        imagesList.add(response.sprites.back_default)
        imagesList.add(response.sprites.back_shiny)
        imagesList.add(response.sprites.front_female as String)
        imagesList.add(response.sprites.back_female as String)
        imagesList.add(response.sprites.front_shiny_female as String)
        imagesList.add(response.sprites.back_shiny_female as String)
        imagesAdapter.notifyDataSetChanged()

        // Set types
        binding.tvNameType1.text = response.types[0].type.name.capitalize()
        binding.cvType1.setCardBackgroundColor(constants.getColor(response.types[0].type.name, resources))

        if (response.types.size > 1) {
            binding.cvType2.visibility = View.VISIBLE
            binding.tvNameType2.text = response.types[1].type.name.capitalize()
            binding.cvType2.setCardBackgroundColor(constants.getColor(response.types[1].type.name, resources))
        }

        // Set stats
        statsList.clear()
        statsList.addAll(response.stats)
        statsAdapter.notifyDataSetChanged()

        // Set fav btn

    }
}