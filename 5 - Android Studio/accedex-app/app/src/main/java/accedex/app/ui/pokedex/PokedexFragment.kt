package accedex.app.ui.pokedex

import accedex.app.Constants
import accedex.app.PokemonActivity
import androidx.lifecycle.ViewModelProvider
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import accedex.app.R
import accedex.app.adapters.PokemonsAdapter
import accedex.app.databinding.PokedexFragmentBinding
import accedex.app.services.MyApiService
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import accedex.app.jk.pokedex.Result
import android.content.Intent
import androidx.recyclerview.widget.GridLayoutManager

class PokedexFragment : Fragment() {

    companion object {
        fun newInstance() = PokedexFragment()
    }

    private lateinit var viewModel: PokedexViewModel
    private lateinit var adapter: PokemonsAdapter
    private lateinit var constants: Constants
    private val pokemonsList = mutableListOf<Result>()

    private var _binding: PokedexFragmentBinding? = null

    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        _binding = PokedexFragmentBinding.inflate(inflater, container, false)

        constants = Constants()

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
        adapter = PokemonsAdapter(pokemonsList)
        adapter.setOnItemClickListener(object : PokemonsAdapter.onItemClickListener{
            override fun onItemClick(id: Int) {
                startActivity(Intent(requireContext(), PokemonActivity::class.java).putExtra("ID", id))
            }
        })
        binding.rvPokemons.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.rvPokemons.adapter = adapter
    }

    private fun getPokemons(limit: Number, offset: Number) {
        CoroutineScope(Dispatchers.IO).launch {
            val call = constants.getRetrofit().create(MyApiService::class.java)
                .getPokemons("pokemon?limit=$limit&offset=$offset")
            var response = call.body()

            requireActivity().runOnUiThread {
                if (response != null) {
                    val pokemons = response.results

                    pokemonsList.clear()
                    pokemonsList.addAll(pokemons)
                    adapter.notifyDataSetChanged()
                } else {
                    constants.showError(requireContext(), getString(R.string.no_pokemons_found))
                }
            }
        }
    }
}