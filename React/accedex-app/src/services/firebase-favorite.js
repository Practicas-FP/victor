/* eslint-disable react-hooks/rules-of-hooks */
import { getDatabase, ref, child, set, get, remove } from "firebase/database";

function getAllFav(uid, setPokemonsFavs) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${uid}/favorite-pokemon`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        setPokemonsFavs(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
}

function getFav(uid, id, setFavorite) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${uid}/favorite-pokemon/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
        setFavorite(true);
      } else {
        setFavorite(false);
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
      setFavorite(false);
    });
}

function saveFav(uid, id, setFavorite) {
  const db = getDatabase();
  set(ref(db, `users/${uid}/favorite-pokemon/${id}`), {
    pokemonId: id,
    date: new Date().toLocaleDateString()
  })
    .then(() => {
      setFavorite(true);
    })
    .catch(error => console.error(error));
}

function deleteFav(uid, id, setFavorite) {
  const db = getDatabase();
  remove(ref(db, `users/${uid}/favorite-pokemon/${id}`))
    .then(() => {
      setFavorite(false);
    })
    .catch(error => console.error(error));
}

export {
  getAllFav,
  getFav,
  saveFav,
  deleteFav
};