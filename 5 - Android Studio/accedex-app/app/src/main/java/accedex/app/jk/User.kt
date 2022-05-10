package accedex.app.jk

data class User(
    val displayName: String?,
    val provider: ProviderType,
    val uid: String?,
    val email: String?,
    val isEmailVerified: Boolean?,
    val photoURL: String?
)
