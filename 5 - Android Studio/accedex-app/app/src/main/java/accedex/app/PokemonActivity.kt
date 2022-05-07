package accedex.app

import accedex.app.adapters.ImagesAdapter
import accedex.app.adapters.StatsAdapter
import accedex.app.databinding.ActivityPokemonBinding
import accedex.app.jk.User
import accedex.app.jk.pokemon.PokemonResponse
import accedex.app.jk.pokemon.Stat
import accedex.app.services.MyApiService
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.LinearLayoutManager
import com.google.firebase.firestore.FirebaseFirestore
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class PokemonActivity : AppCompatActivity() {

    private val db = FirebaseFirestore.getInstance()

    private var id: Int = 0
    private var name: String = ""
    private lateinit var user: User
    private var isFavorite = false

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

        user = constants.getUser(this)
        setUI()
        getPokemon()
        getIsFavorite()
    }

    private fun setUI() {
        // Images Adapter
        imagesAdapter = ImagesAdapter(imagesList)
        binding.rvImages.layoutManager =
            LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        binding.rvImages.adapter = imagesAdapter

        // Stats Adapter
        statsAdapter = StatsAdapter(statsList)
        binding.rvStats.layoutManager = GridLayoutManager(this, 2)
        binding.rvStats.adapter = statsAdapter

        // Favorite Btn
        changeFabFav()

        binding.fabFav.setOnClickListener {
            if (isFavorite) {
                db.collection(Constants.DB_COL_USERS).document(user.uid.toString())
                    .collection(Constants.DB_COL_FAVS).document("$id").delete()
                    .addOnCompleteListener {
                        isFavorite = false
                        changeFabFav()
                        constants.showError(this, getString(R.string.remove_fav))
                    }
            } else {
                db.collection(Constants.DB_COL_USERS).document(user.uid.toString())
                    .collection(Constants.DB_COL_FAVS).document("$id").set(
                        hashMapOf(
                            Constants.ID to id,
                            Constants.NAME to name
                        )
                    ).addOnCompleteListener {
                        isFavorite = true
                        changeFabFav()
                        constants.showError(this, getString(R.string.added_fav))
                    }
            }
        }

        // Next & Prev Btns
        binding.btNext.setOnClickListener {
            startActivity(Intent(this, PokemonActivity::class.java).putExtra("ID", id + 1))
        }

        binding.btPrev.setOnClickListener {
            startActivity(Intent(this, PokemonActivity::class.java).putExtra("ID", id - 1))
        }
    }

    private fun changeFabFav() {
        binding.fabFav.backgroundTintList =
            if (isFavorite) resources.getColorStateList(R.color.danger) else resources.getColorStateList(
                R.color.info
            )
        binding.fabFav.setImageDrawable(
            if (isFavorite) resources.getDrawable(R.drawable.ic_favorite_24) else resources.getDrawable(
                R.drawable.ic_no_favorite_24
            )
        )

    }

    private fun getPokemon() {
        id = intent.getIntExtra("ID", 0)
        name = intent.getStringExtra("ID").toString()

        title = "Buscando pokemon ${if (id > 0) id else name}..."

        CoroutineScope(Dispatchers.IO).launch {
            val call = constants.getRetrofit().create(MyApiService::class.java)
                .getPokemonById("pokemon/${if (id > 0) id else name}")
            var response = call.body()

            runOnUiThread {
                if (response != null) {
                    setData(response)
                    changeView()
                } else {
                    constants.showError(this@PokemonActivity, getString(R.string.no_pokemon_found))
                    finish()
                }
            }
        }
    }

    private fun changeView() {
        binding.shimmerPokemon.visibility = View.INVISIBLE
        binding.clPokemon.visibility = View.VISIBLE
    }

    private fun setData(response: PokemonResponse) {
        id = response.id
        name = response.name

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
        binding.cvType1.setCardBackgroundColor(
            constants.getColor(
                response.types[0].type.name,
                resources
            )
        )

        if (response.types.size > 1) {
            binding.cvType2.visibility = View.VISIBLE
            binding.tvNameType2.text = response.types[1].type.name.capitalize()
            binding.cvType2.setCardBackgroundColor(
                constants.getColor(
                    response.types[1].type.name,
                    resources
                )
            )
        }

        // Set stats
        statsList.clear()
        statsList.addAll(response.stats)
        statsAdapter.notifyDataSetChanged()
    }

    private fun getIsFavorite() {
        db.collection(Constants.DB_COL_USERS).document(user.uid.toString())
            .collection(Constants.DB_COL_FAVS).document("$id").get().addOnSuccessListener {
                if (it.get(Constants.NAME) != null) {
                    isFavorite = true
                    changeFabFav()
                }
            }
    }
}