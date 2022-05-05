package accedex.app.adapters

import accedex.app.R
import accedex.app.databinding.CardImageBinding
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.squareup.picasso.Picasso

class ImagesAdapter(private val images: List<String>): RecyclerView.Adapter<ImagesAdapter.ImagesViewHolder>() {

    class ImagesViewHolder(view: View): RecyclerView.ViewHolder(view) {

        private val binding = CardImageBinding.bind(view)

        fun bind(image: String) {
            Picasso.get().load(image).into(binding.ivPokemon)
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ImagesViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        return ImagesViewHolder(layoutInflater.inflate(R.layout.card_image, parent, false))
    }

    override fun onBindViewHolder(holder: ImagesViewHolder, position: Int) {
        val item = images[position];
        holder.bind(item)
    }

    override fun getItemCount(): Int = images.size
}