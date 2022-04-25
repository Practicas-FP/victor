/* eslint-disable react-hooks/rules-of-hooks */
import { getDatabase, ref, child, set, get, remove } from "firebase/database";
import { Link } from "react-router-dom";
import pokeballbackground from '../assets/images/pokeballbackground.png';
import React, { useState, useEffect } from "react";

function getAllFav(uid, setIsLoading, setData, setNoPokemonsFound, setPaginate, setPageCount) {
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

        // Paginate
        /* const itemsPerPage = 6;
        const [itemOffset, setItemOffset] = useState(0);
        const [currentItems, setCurrentItems] = useState(null);

        const pokemons = data.map((pokemon, index) => {
          return (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-2 hand-above hover-shadow">
              <Link to={`/pokemon/${pokemon.id}`}>
                <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                  <img className="card-bg" src={pokeballbackground} alt="pokeball-card" />
                  <div>
                    <h2 className="card-info-h2 mt-3 text-secondary">{`#${pokemon.id} ${pokemon.name}`}</h2>
                  </div>
                  <div className="card-img">
                    <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt={`Imgae ${pokemon.name}`} />
                  </div>
                </div>
              </Link>
            </div>
          );
        });

        const endOffset = itemOffset + itemsPerPage;
        setCurrentItems(data.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(data.length / itemsPerPage));

        const handlePageClick = (event) => {
          const newOffset = (event.selected * itemsPerPage) % data.length;
          setItemOffset(newOffset);
        };

        setPaginate({
          pokemons: pokemons,
          handlePageClick: handlePageClick
        }); */

      } else {
        //console.log("getAllFavs(): No data available");
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