package accedex.app

import accedex.app.Constants.Companion.DISPLAY_NAME
import accedex.app.Constants.Companion.IS_EMAIL_VERIFIED
import accedex.app.Constants.Companion.PHOTO_URL
import accedex.app.Constants.Companion.UID
import accedex.app.databinding.ActivityAuthBinding
import accedex.app.jk.ProviderType
import accedex.app.jk.User
import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.GoogleAuthProvider

class AuthActivity : AppCompatActivity() {

    private lateinit var binding: ActivityAuthBinding
    private lateinit var constants: Constants

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityAuthBinding.inflate(layoutInflater)
        setContentView(binding.root)

        constants = Constants()

        setUI()
        session()
    }

    private fun session() {
        val prefs = this.getSharedPreferences(
            Constants.SHARED_PROFILE,
            Context.MODE_PRIVATE
        )
        val email = prefs.getString(Constants.EMAIL, null)
        var provider = prefs.getString(Constants.PROVIDER, null)

        if (email != null && provider != null) {
            binding.root.visibility = View.INVISIBLE
            startActivity(Intent(this, MainActivity::class.java))
        }
    }

    private fun setUI() {
        binding.btLogin.setOnClickListener {
            if (binding.etEmailRegister.text.isNotBlank() && binding.etPasswordRegister.text.isNotEmpty()) {
                if (constants.checkForInternet(this)) {
                    FirebaseAuth.getInstance().signInWithEmailAndPassword(
                        binding.etEmailRegister.text.toString(),
                        binding.etPasswordRegister.text.toString()
                    ).addOnCompleteListener {
                        if (it.isSuccessful) {
                            loginSuccessful(constants.createUser(it, ProviderType.BASIC, null))
                        } else {
                            constants.showError(
                                this,
                                getString(R.string.login_auth_error)
                            )
                        }
                    }
                } else {
                    constants.showError(this, getString(R.string.no_internet_access))
                }
            }
        }

        binding.btRegister.setOnClickListener {
            if (binding.etEmailRegister.text.isNotBlank() && binding.etPasswordRegister.text.isNotEmpty()) {
                if (constants.checkForInternet(this)) {
                    FirebaseAuth.getInstance().createUserWithEmailAndPassword(
                        binding.etEmailRegister.text.toString(),
                        binding.etPasswordRegister.text.toString()
                    ).addOnCompleteListener {
                        if (it.isSuccessful) {
                            loginSuccessful(constants.createUser(it, ProviderType.BASIC, null))
                        } else {
                            constants.showError(
                                this,
                                getString(R.string.register_auth_error)
                            )
                        }
                    }
                } else {
                    constants.showError(this, getString(R.string.no_internet_access))
                }
            }
        }

        binding.btLoginGoogle.setOnClickListener {
            if (constants.checkForInternet(this)) {
                val googleConf = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                    .requestIdToken(getString(R.string.default_web_client_id))
                    .requestEmail()
                    .build()

                val googleClinet = GoogleSignIn.getClient(this, googleConf)
                googleClinet.signOut()

                startActivityForResult(googleClinet.signInIntent, Constants.GOOGLE_SIGN_IN)
            } else {
                constants.showError(this, getString(R.string.no_internet_access))
            }
        }
    }

    private fun loginSuccessful(user: User) {
        val prefs = this.getSharedPreferences(
            Constants.SHARED_PROFILE,
            Context.MODE_PRIVATE
        ).edit()
        prefs.putString(Constants.EMAIL, user.email)
        prefs.putString(Constants.PROVIDER, user.provider.toString())
        prefs.putString(DISPLAY_NAME, user.displayName)
        prefs.putString(UID, user.uid)
        prefs.putBoolean(IS_EMAIL_VERIFIED, user.isEmailVerified ?: false)
        prefs.putString(PHOTO_URL, user.photoURL.toString())
        prefs.apply()

        startActivity(Intent(this, MainActivity::class.java))
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if (requestCode == Constants.GOOGLE_SIGN_IN) {
            val task = GoogleSignIn.getSignedInAccountFromIntent(data)

            try {
                val account = task.getResult(ApiException::class.java)

                if (account != null) {
                    val credentials = GoogleAuthProvider.getCredential(account.idToken, null)

                    FirebaseAuth.getInstance().signInWithCredential(credentials)
                        .addOnCompleteListener {
                            if (it.isSuccessful) {
                                loginSuccessful(
                                    constants.createUser(
                                        it,
                                        ProviderType.GOOGLE,
                                        account.photoUrl
                                    )
                                )
                            } else {
                                constants.showError(
                                    this,
                                    getString(R.string.login_auth_error)
                                )
                            }
                        }
                }
            } catch (e: ApiException) {
                constants.showError(this, e.message.toString())
            }
        }
    }
}