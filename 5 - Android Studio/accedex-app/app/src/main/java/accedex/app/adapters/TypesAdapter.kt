package accedex.app.adapters

import accedex.app.R
import accedex.app.databinding.CardTypeBinding
import accedex.app.jk.MyType
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

class TypesAdapter(private val types: List<MyType>): RecyclerView.Adapter<TypesAdapter.TypeViewHolder>() {

    class TypeViewHolder(view: View): RecyclerView.ViewHolder(view) {

        private val binding = CardTypeBinding.bind(view)

        fun bind(type: MyType) {
            binding.tvName.text = type.name
            //binding.cvType.cardBackgroundColor = type.color
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): TypeViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        return TypeViewHolder(layoutInflater.inflate(R.layout.card_type, parent, false))
    }

    override fun onBindViewHolder(holder: TypeViewHolder, position: Int) {
        val item = types[position];
        holder.bind(item)
    }

    override fun getItemCount(): Int = types.size
}