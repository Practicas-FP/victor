package accedex.app.services.database.dao

import accedex.app.services.database.entities.PokeFavEntity
import androidx.room.Dao
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query

@Dao
interface PokeFavDao {

    @Query("SELECT * FROM poke_favs_table ORDER BY id ASC")
    suspend fun getAllFavs(): List<PokeFavEntity>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPokeFav(pokeFavEntity: PokeFavEntity)
}