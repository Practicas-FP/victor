package accedex.app.jk.pokedex

data class PokedexResponse(
    val count: Int,
    val next: String,
    val previous: Any,
    val results: List<Result>
)