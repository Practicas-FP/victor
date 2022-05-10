package accedex.app.ui.profile

import accedex.app.AuthActivity
import accedex.app.Constants
import accedex.app.Constants.Companion.ID
import accedex.app.Constants.Companion.NAME
import accedex.app.Constants.Companion.REQUEST_CODE
import accedex.app.Constants.Companion.SHARED_PROFILE
import accedex.app.PokemonActivity
import accedex.app.R
import accedex.app.adapters.PokemonsAdapter
import accedex.app.databinding.ProfileFragmentBinding
import accedex.app.jk.User
import accedex.app.jk.pokedex.Result
import accedex.app.services.database.entities.PokeFavEntity
import android.app.Activity
import android.content.Context
import android.content.Intent
import android.graphics.Bitmap
import android.os.Bundle
import android.provider.MediaStore
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.GridLayoutManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.firestore.FieldValue
import com.google.firebase.firestore.FirebaseFirestore
import com.squareup.picasso.Picasso


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
        getProfilePicture()
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
            dispatchTakePictureIntent()
        }

        binding.btnRemovePhoto?.setOnClickListener {
            db.collection(Constants.DB_COL_USERS).document(user.uid.toString())
                .update(
                    hashMapOf<String, Any>(
                        Constants.PHOTO to FieldValue.delete()
                    )
                )
                .addOnCompleteListener {
                    changeBtnsPhoto(true)
                    Picasso.get().load(user.photoURL ?: "https://via.placeholder.com/300x300.png?text=No+image").into(binding.ivProfile)
                    constants.showError(requireContext(), getString(R.string.image_deleted))
                }
        }
    }

    private fun setUserData() {
        Picasso.get().load(user.photoURL ?: "https://via.placeholder.com/300x300.png?text=No+image").into(binding.ivProfile)
        binding.tvDisplayName.text = user.displayName ?: getString(R.string.no_login_name)
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

    private fun getProfilePicture() {
        db.collection(Constants.DB_COL_USERS).document(user.uid.toString()).get()
            .addOnSuccessListener {
                val photo = it.get(Constants.PHOTO)
                if (photo != null) {
                    binding.ivProfile.setImageBitmap(constants.decodeImage(photo as String))

                    changeBtnsPhoto(false)
                }
            }
    }

    private fun changeBtnsPhoto(edit: Boolean) {
        if (edit) {
            binding.btnTakePhoto.visibility = View.VISIBLE
            binding.btnRemovePhoto?.visibility = View.GONE
        } else {
            binding.btnTakePhoto.visibility = View.GONE
            binding.btnRemovePhoto?.visibility = View.VISIBLE
        }
    }

    private fun dispatchTakePictureIntent() {
        val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)

        if (takePictureIntent.resolveActivity(requireActivity().packageManager) != null) {
            startActivityForResult(takePictureIntent, REQUEST_CODE)
        } else {
            constants.showError(requireContext(), getString(R.string.unable_open_camera))
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == REQUEST_CODE && resultCode == Activity.RESULT_OK) {
            val takenImage = data?.extras?.get("data") as Bitmap

            db.collection(Constants.DB_COL_USERS).document(user.uid.toString()).set(
                hashMapOf(
                    Constants.PHOTO to constants.encodeImage(takenImage)
                )
            ).addOnCompleteListener {
                binding.ivProfile.setImageBitmap(takenImage)
                changeBtnsPhoto(false)
                constants.showError(
                    requireContext(),
                    getString(R.string.image_successfully_modified)
                )
            }
        } else {
            super.onActivityResult(requestCode, resultCode, data)
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