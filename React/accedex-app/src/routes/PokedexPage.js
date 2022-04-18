import React, { useState, useEffect } from "react";

export default () => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState();

    var pokemons = new Array();

    const urlBase = 'https://pokeapi.co/api/v2';
    let offset = 0;
    let limit = 12;

    useEffect(() => {
        fetch(`${urlBase}/pokemon?offset=${offset}&limit=${limit}`)
          .then((res) => res.json())
          .then((response) => {
            setData(response.results);
            setIsLoading(false);

            pokemons = response.results;
            console.log(pokemons)
          })
          .catch((error) => console.log(error));
      }, []);

      return (
        <>
          {!isLoading &&
            pokemons.map((pokemon, index) => {
              return (
                <h5 key={index}>
                  {/* <Link to={`/person/${index + 1}`}>{person.name}'s Page</Link> */}
                  {pokemon.id}
                </h5>
              );
            })}
        </>
      );
}