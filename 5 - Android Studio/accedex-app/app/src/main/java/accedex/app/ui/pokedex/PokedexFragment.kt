package accedex.app.ui.pokedex

import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import accedex.app.R
import accedex.app.databinding.PokedexFragmentBinding
import accedex.app.services.MyApiService
import android.widget.Toast
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import accedex.app.jk.pokedex.Result
import android.util.Log
import androidx.recyclerview.widget.GridLayoutManager

class PokedexFragment : Fragment() {

    private val TAG = "TAAG"

    companion object {
        fun newInstance() = PokedexFragment()
    }

    private lateinit var viewModel: PokedexViewModel
    private lateinit var adapter: PokemonAdapter
    private val pokemonsList = mutableListOf<Result>()

    private var _binding: PokedexFragmentBinding? = null

    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = PokedexFragmentBinding.inflate(inflater, container, false)

        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)
        viewModel = ViewModelProvider(this).get(PokedexViewModel::class.java)
        // TODO: Use the ViewModel
        initRecyclerView()
        getPokemons(12, 0)
    }

    private fun initRecyclerView() {
        adapter = PokemonAdapter(pokemonsList)
        adapter.setOnItemClickListener(object : PokemonAdapter.onItemClickListener{
            override fun onItemClick(id: Int) {
                Log.d(TAG, "onItemClick: Pokemon pulsado $id")
            }
        })
        binding.rvPokemons.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.rvPokemons.adapter = adapter
    }

    private fun getRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl(MyApiService.URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    private fun getPokemons(limit: Number, offset: Number) {
        CoroutineScope(Dispatchers.IO).launch {
            val call = getRetrofit().create(MyApiService::class.java)
                .getPokemons("pokemon?limit=$limit&offset=$offset")
            var response = call.body()

            requireActivity().runOnUiThread {
                if (response != null) {
                    val pokemons = response.results

                    pokemonsList.clear()
                    pokemonsList.addAll(pokemons)
                    adapter.notifyDataSetChanged()
                } else {
                    showError()
                }
            }
        }
    }

    private fun showError() {
        Toast.makeText(requireContext(), getString(R.string.no_pokemons_found), Toast.LENGTH_SHORT)
            .show()
    }
}