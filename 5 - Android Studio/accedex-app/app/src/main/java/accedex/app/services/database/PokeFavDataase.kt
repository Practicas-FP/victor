package accedex.app.services.database

import accedex.app.services.database.dao.PokeFavDao
import accedex.app.services.database.entities.PokeFavEntity
import androidx.room.Database
import androidx.room.RoomDatabase

@Database(entities = [PokeFavEntity::class], version = 1)
abstract class PokeFavDataase: RoomDatabase() {

    abstract fun getPokeFavDao(): PokeFavDao
}