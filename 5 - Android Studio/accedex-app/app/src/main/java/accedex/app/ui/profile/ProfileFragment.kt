package accedex.app.ui.profile

import accedex.app.AuthActivity
import accedex.app.Constants
import accedex.app.Constants.Companion.ID
import accedex.app.Constants.Companion.NAME
import accedex.app.Constants.Companion.REQUEST_CODE
import accedex.app.Constants.Companion.REQUEST_IMAGE_CAPTURE
import accedex.app.Constants.Companion.SHARED_PROFILE
import accedex.app.Constants.Companion.TAG
import accedex.app.PokemonActivity
import accedex.app.R
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import accedex.app.adapters.PokemonsAdapter
import accedex.app.databinding.ProfileFragmentBinding
import accedex.app.jk.User
import accedex.app.jk.pokedex.Result
import accedex.app.services.database.PokeFavDataase
import accedex.app.services.database.entities.PokeFavEntity
import android.Manifest
import android.app.Activity
import android.app.Activity.RESULT_OK
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.provider.MediaStore
import android.util.Log
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.GridLayoutManager
import androidx.room.Room
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FirebaseFirestore
import com.squareup.picasso.Picasso
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ProfileFragment : Fragment() {

    private val db = FirebaseFirestore.getInstance()

    companion object {
        fun newInstance() = ProfileFragment()
    }

    private var _binding: ProfileFragmentBinding? = null
    private val binding get() = _binding!!

    private lateinit var constants: Constants
    private lateinit var user: User

    private val pokemonsFavsList = mutableListOf<Result>()
    private val pokemonsFavsListRoom = mutableListOf<PokeFavEntity>()
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
        user = constants.getUser(requireContext())
        if (user == null) {
            startActivity(Intent(requireContext(), AuthActivity::class.java))
        }
        setUserData()
        getPokeFavs()
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
        adapter.setOnItemClickListener(object : PokemonsAdapter.onItemClickListener {
            override fun onItemClick(id: Int) {
                if (constants.checkForInternet(requireContext())) {
                    startActivity(
                        Intent(requireContext(), PokemonActivity::class.java).putExtra(
                            "ID",
                            id
                        )
                    )
                } else {
                    constants.showError(requireContext(), getString(R.string.no_internet_access))
                }
            }
        })
        binding.rvPokeFavs.layoutManager = GridLayoutManager(requireContext(), 2)
        binding.rvPokeFavs.adapter = adapter

        binding.btnTakePhoto.setOnClickListener {
            //dispatchTakePictureIntent()
        }
    }

    private fun setUserData() {
        Picasso.get().load(user.photoURL).into(binding.ivProfile)
        binding.tvDisplayName.text = user.displayName
        binding.tvEmail.text = user.email
    }

    private fun getPokeFavs() {
        // Firebase
        db.collection(Constants.DB_COL_USERS).document(user.uid.toString())
            .collection(Constants.DB_COL_FAVS).get().addOnSuccessListener {
                pokemonsFavsList.clear()

                it.documents.forEach { it ->
                    pokemonsFavsList.add(
                        Result(
                            it.get(NAME).toString(),
                            "https://pokeapi.co/api/v2/pokemon/${it.get(ID)}/"
                        )
                    )
                }
                adapter.notifyDataSetChanged()
            }

        // Room
        /*CoroutineScope(Dispatchers.IO).launch {
            pokemonsFavsList.clear()

            val dbRoom = Room.databaseBuilder(
                requireContext(),
                PokeFavDataase::class.java,
                "poke_favs_table"
            ).build()

            dbRoom.getPokeFavDao().getAllFavs().forEach {
                pokemonsFavsList.add(
                    Result(
                        it.name,
                        "https://pokeapi.co/api/v2/pokemon/${it.id}/"
                    )
                )
            }

            adapter.notifyDataSetChanged()
        }*/
    }

    private fun dispatchTakePictureIntent() {
        Intent(MediaStore.ACTION_IMAGE_CAPTURE).also { takePictureIntent ->
            takePictureIntent.resolveActivity(requireContext().packageManager)?.also {
                startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE)
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            val imageBitmap = data?.extras?.get("data") as Bitmap
            Log.d(TAG, "onActivityResult: $imageBitmap")
        }
    }

    override fun onResume() {
        super.onResume()

        db.collection(Constants.DB_COL_USERS).document(user.uid.toString())
            .collection(Constants.DB_COL_FAVS).get().addOnSuccessListener {

                if (it.documents.size != adapter.itemCount) {
                    pokemonsFavsList.clear()

                    it.documents.forEach { it ->
                        pokemonsFavsList.add(
                            Result(
                                it.get(NAME).toString(),
                                "https://pokeapi.co/api/v2/pokemon/${it.get(ID)}/"
                            )
                        )
                    }
                    adapter.notifyDataSetChanged()
                }
            }
    }
}