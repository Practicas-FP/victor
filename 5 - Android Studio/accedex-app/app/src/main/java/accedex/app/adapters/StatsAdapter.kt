package accedex.app.adapters

import accedex.app.R
import accedex.app.databinding.CardStatBinding
import accedex.app.jk.pokemon.Stat
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView

class StatsAdapter(private val stats: List<Stat>): RecyclerView.Adapter<StatsAdapter.StatViewHolder>() {

    class StatViewHolder(view: View): RecyclerView.ViewHolder(view) {

        private val binding = CardStatBinding.bind(view)

        fun bind(stat: Stat) {
            binding.pbStat.progress = stat.base_stat
            binding.tvStatName.text = stat.stat.name.capitalize()
            binding.tvStatNumber.text = stat.base_stat.toString()
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): StatViewHolder {
        val layoutInflater = LayoutInflater.from(parent.context)
        return StatViewHolder(layoutInflater.inflate(R.layout.card_stat, parent, false))
    }

    override fun onBindViewHolder(holder: StatViewHolder, position: Int) {
        val item = stats[position];
        holder.bind(item)
    }

    override fun getItemCount(): Int = stats.size
}