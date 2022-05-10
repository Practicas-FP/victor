package accedex.app

import android.os.Bundle
import android.view.Menu
import com.google.android.material.navigation.NavigationView
import androidx.navigation.findNavController
import androidx.navigation.ui.AppBarConfiguration
import androidx.navigation.ui.navigateUp
import androidx.navigation.ui.setupActionBarWithNavController
import androidx.navigation.ui.setupWithNavController
import androidx.drawerlayout.widget.DrawerLayout
import androidx.appcompat.app.AppCompatActivity
import accedex.app.databinding.ActivityMainBinding
import android.content.Intent
import android.widget.ImageView
import android.widget.TextView
import com.squareup.picasso.Picasso

class MainActivity : AppCompatActivity() {

    private lateinit var appBarConfiguration: AppBarConfiguration
    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setSupportActionBar(binding.appBarMain.toolbar)

        /*binding.appBarMain.fab.setOnClickListener { view ->
            Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                .setAction("Action", null).show()
        }*/
        val drawerLayout: DrawerLayout = binding.drawerLayout
        val navView: NavigationView = binding.navView
        val navController = findNavController(R.id.nav_host_fragment_content_main)
        // Passing each menu ID as a set of Ids because each
        // menu should be considered as top level destinations.
        appBarConfiguration = AppBarConfiguration(
            setOf(
                R.id.nav_pokedex, R.id.nav_profile
            ), drawerLayout
        )

        // Comprobar si esta logged
        val constants = Constants()
        val user = constants.getUser(this)
        if (user == null) {
            startActivity(Intent(this, AuthActivity::class.java))
        }

        val header = navView.getHeaderView(0)
        val tvName = header.findViewById<TextView>(R.id.tvNavName)
        val tvEmail = header.findViewById<TextView>(R.id.tvNavEmail)
        val ivProfile = header.findViewById<ImageView>(R.id.imageView)

        tvName.text = user.displayName ?: getString(R.string.no_login_name)
        tvEmail.text = user.email
        Picasso.get().load(user.photoURL ?: "https://via.placeholder.com/300x300.png?text=No+image").into(ivProfile)

        setupActionBarWithNavController(navController, appBarConfiguration)
        navView.setupWithNavController(navController)
    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        // Inflate the menu; this adds items to the action bar if it is present.
        //menuInflater.inflate(R.menu.main, menu)
        return true
    }

    override fun onSupportNavigateUp(): Boolean {
        val navController = findNavController(R.id.nav_host_fragment_content_main)
        return navController.navigateUp(appBarConfiguration) || super.onSupportNavigateUp()
    }
}