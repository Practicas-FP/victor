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
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.view.KeyEvent
import android.view.inputmethod.InputMethodManager
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
        getPokemons(Constants.LIMIT, Constants.OFFSET)
    }

    private fun initRecyclerView() {
        adapter = PokemonsAdapter(pokemonsList)
        adapter.setOnItemClickListener(object : PokemonsAdapter.onItemClickListener {
            override fun onItemClick(id: Int) {
                startActivity(
                    Intent(requireContext(), PokemonActivity::class.java).putExtra(
                        "ID",
                        id
                    )
                )
            }
        })
        binding.rvPokemons.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.rvPokemons.adapter = adapter

        binding.etSearchPokemon.setOnKeyListener(object : View.OnKeyListener {
            override fun onKey(v: View?, keyCode: Int, event: KeyEvent): Boolean {
                if (event.action == KeyEvent.ACTION_DOWN && keyCode == KeyEvent.KEYCODE_ENTER) {
                    // hide soft keyboard programmatically
                    hideKeyboard()

                    // clear focus and hide cursor from edit text
                    binding.etSearchPokemon.clearFocus()

                    if (!binding.etSearchPokemon.text.toString().isNullOrEmpty()) {
                        startActivity(
                            Intent(requireContext(), PokemonActivity::class.java).putExtra(
                                "ID",
                                binding.etSearchPokemon.text.toString().toLowerCase()
                            )
                        )
                        binding.etSearchPokemon.text = null;
                    } else {
                        constants.showError(
                            requireContext(),
                            getString(R.string.the_field_cannot_be_empty)
                        )
                    }
                    return true
                }
                return false
            }
        })
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

fun Fragment.hideKeyboard() {
    view?.let { activity?.hideKeyboard(it) }
}

fun Activity.hideKeyboard() {
    hideKeyboard(currentFocus ?: View(this))
}

fun Context.hideKeyboard(view: View) {
    val inputMethodManager = getSystemService(Activity.INPUT_METHOD_SERVICE) as InputMethodManager
    inputMethodManager.hideSoftInputFromWindow(view.windowToken, 0)
}