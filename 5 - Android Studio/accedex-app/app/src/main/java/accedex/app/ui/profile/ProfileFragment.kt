package accedex.app.ui.profile

import accedex.app.AuthActivity
import accedex.app.Constants
import accedex.app.Constants.Companion.DISPLAY_NAME
import accedex.app.Constants.Companion.EMAIL
import accedex.app.Constants.Companion.IS_EMAIL_VERIFIED
import accedex.app.Constants.Companion.PHOTO_URL
import accedex.app.Constants.Companion.PROVIDER
import accedex.app.Constants.Companion.SHARED_PROFILE
import accedex.app.Constants.Companion.UID
import accedex.app.PokemonActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import accedex.app.adapters.PokemonsAdapter
import accedex.app.databinding.ProfileFragmentBinding
import accedex.app.jk.ProviderType
import accedex.app.jk.User
import accedex.app.jk.pokedex.Result
import android.content.Context
import android.content.Intent
import androidx.recyclerview.widget.GridLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.squareup.picasso.Picasso

class ProfileFragment : Fragment() {

    companion object {
        fun newInstance() = ProfileFragment()
    }

    private var _binding: ProfileFragmentBinding? = null
    private val binding get() = _binding!!

    private lateinit var constants: Constants
    private lateinit var user: User

    private val pokemonsFavsList = mutableListOf<Result>()
    private lateinit var adapter: PokemonsAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = ProfileFragmentBinding.inflate(inflater, container, false)
        constants = Constants()
        return binding.root
    }

    override fun onActivityCreated(savedInstanceState: Bundle?) {
        super.onActivityCreated(savedInstanceState)

        setUI()
        session()
        setUserData()
        getPokeFavs()
    }

    private fun session() {
        val prefs = requireContext().getSharedPreferences(
            SHARED_PROFILE,
            Context.MODE_PRIVATE
        )

        user = User(
            prefs.getString(DISPLAY_NAME, null),
            ProviderType.valueOf(prefs.getString(PROVIDER, "BASIC").toString()),
            prefs.getString(UID, null),
            prefs.getString(EMAIL, null),
            prefs.getBoolean(IS_EMAIL_VERIFIED, false),
            prefs.getString(PHOTO_URL, null)
        )
    }

    private fun setUI() {
        binding.btLogOut.setOnClickListener {
            FirebaseAuth.getInstance().signOut()
            val prefs = requireContext().getSharedPreferences(
                SHARED_PROFILE,
                Context.MODE_PRIVATE
            ).edit()
            prefs.clear()
            prefs.apply()
            startActivity(Intent(requireContext(), AuthActivity::class.java))
        }

        adapter = PokemonsAdapter(pokemonsFavsList)
        adapter.setOnItemClickListener(object : PokemonsAdapter.onItemClickListener{
            override fun onItemClick(id: Int) {
                startActivity(Intent(requireContext(), PokemonActivity::class.java).putExtra("ID", id))
            }
        })
        binding.rvPokeFavs.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.rvPokeFavs.adapter = adapter
    }

    private fun setUserData() {
        Picasso.get().load(user.photoURL).into(binding.ivProfile)
        binding.tvDisplayName.text = user.displayName
        binding.tvEmail.text = user.email
    }

    private fun getPokeFavs() {

    }
}