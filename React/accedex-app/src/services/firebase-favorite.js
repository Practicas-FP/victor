/* eslint-disable react-hooks/rules-of-hooks */
import { getDatabase, ref, child, set, get, remove } from "firebase/database";

function getAllFav(uid, setIsLoading, setData, setNoPokemonsFound) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${uid}/favorite-pokemon`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const res = snapshot.val();
        const data = new Array();

        for (var key in res) {
          data.push(res[key]);
        }

        setData(data);
      } else {
        console.log("getAllFavs(): No data available");
        setNoPokemonsFound(true);
      }

      setIsLoading(false);
    }).catch((error) => {
      console.error(error);
      setIsLoading(false);
      setNoPokemonsFound(true);
    });
}

function getFav(uid, id, setFavorite) {
  const dbRef = ref(getDatabase());
  get(child(dbRef, `users/${uid}/favorite-pokemon/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        //console.log(snapshot.val());
        setFavorite(true);
      } else {
        setFavorite(false);
        console.log("getFav(): No data available");
      }
    }).catch((error) => {
      console.error(error);
      setFavorite(false);
    });
}

function saveFav(uid, id, name, setFavorite) {
  const db = getDatabase();
  set(ref(db, `users/${uid}/favorite-pokemon/${id}`), {
    id: id,
    name: name,
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