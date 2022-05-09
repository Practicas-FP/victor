package accedex.app

import accedex.app.jk.ProviderType
import accedex.app.jk.User
import android.content.Context
import android.content.SharedPreferences
import android.content.res.Resources
import android.net.ConnectivityManager
import android.net.NetworkCapabilities
import android.net.Uri
import android.os.Build
import android.widget.Toast
import com.google.android.gms.tasks.Task
import com.google.firebase.auth.AuthResult
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class Constants {

    companion object {
        const val TAG = "TAAG"

        const val URL = "https://pokeapi.co/api/v2/"
        const val GOOGLE_SIGN_IN = 100
        const val DISPLAY_NAME = "DISPLAY_NAME"
        const val UID = "UID"
        const val IS_EMAIL_VERIFIED = "IS_EMIAL_VERIFIED"
        const val PHOTO_URL = "PHOTO_URL"
        const val EMAIL = "EMAIL"
        const val PROVIDER = "PROVIDER"
        const val SHARED_PROFILE = "SHARED_PROFILE"

        const val DB_COL_USERS = "users"
        const val DB_COL_FAVS = "favorites"
        const val NAME = "name"
        const val ID = "id"

        const val LIMIT = 1000
        const val OFFSET = 0

        const val REQUEST_CODE = 200
    }

    fun getRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl(URL)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    fun showError(context: Context, msg: String) {
        Toast.makeText(context, msg, Toast.LENGTH_SHORT).show()
    }

    fun getColor(color: String, resources: Resources): Int {
        return when (color) {
            "grass" -> resources.getColor(R.color.grass)
            "fire" -> resources.getColor(R.color.fire)
            "water" -> resources.getColor(R.color.water)
            "normal" -> resources.getColor(R.color.normal)
            "flying" -> resources.getColor(R.color.flying)
            "bug" -> resources.getColor(R.color.bug)
            "poison" -> resources.getColor(R.color.poison)
            "electric" -> resources.getColor(R.color.electric)
            "ground" -> resources.getColor(R.color.ground)
            "fighting" -> resources.getColor(R.color.fighting)
            "psychic" -> resources.getColor(R.color.psychic)
            "rock" -> resources.getColor(R.color.rock)
            "ice" -> resources.getColor(R.color.ice)
            "ghost" -> resources.getColor(R.color.ghost)
            "dragon" -> resources.getColor(R.color.dragon)
            "dark" -> resources.getColor(R.color.dark)
            "steel" -> resources.getColor(R.color.steel)
            "fairy" -> resources.getColor(R.color.fairy)
            "gray" -> resources.getColor(R.color.gray)
            else -> resources.getColor(R.color.no_color)
        }
    }

    fun createUser(it: Task<AuthResult>, basic: ProviderType, photoUrl: Uri?): User {
        return User(
            it.result.user?.displayName.toString(),
            ProviderType.BASIC,
            it.result.user?.uid,
            it.result.user?.email.toString(),
            it.result.user?.isEmailVerified,
            photoUrl.toString() ?: it.result.user?.photoUrl.toString()
        )
    }

    fun getUser(context: Context): User {
        val prefs = context.getSharedPreferences(
            SHARED_PROFILE,
            Context.MODE_PRIVATE
        )

        return User(
            prefs.getString(DISPLAY_NAME, null),
            ProviderType.valueOf(prefs.getString(PROVIDER, "BASIC").toString()),
            prefs.getString(UID, null),
            prefs.getString(EMAIL, null),
            prefs.getBoolean(IS_EMAIL_VERIFIED, false),
            prefs.getString(PHOTO_URL, null)
        )
    }

    fun checkForInternet(context: Context): Boolean {

        // register activity with the connectivity manager service
        val connectivityManager =
            context.getSystemService(Context.CONNECTIVITY_SERVICE) as ConnectivityManager

        // if the android version is equal to M
        // or greater we need to use the
        // NetworkCapabilities to check what type of
        // network has the internet connection
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {

            // Returns a Network object corresponding to
            // the currently active default data network.
            val network = connectivityManager.activeNetwork ?: return false

            // Representation of the capabilities of an active network.
            val activeNetwork = connectivityManager.getNetworkCapabilities(network) ?: return false

            return when {
                // Indicates this network uses a Wi-Fi transport,
                // or WiFi has network connectivity
                activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) -> true

                // Indicates this network uses a Cellular transport. or
                // Cellular has network connectivity
                activeNetwork.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) -> true

                // else return false
                else -> false
            }
        } else {
            // if the android version is below M
            @Suppress("DEPRECATION") val networkInfo =
                connectivityManager.activeNetworkInfo ?: return false
            @Suppress("DEPRECATION")
            return networkInfo.isConnected
        }
    }
}