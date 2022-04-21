/* eslint-disable react-hooks/rules-of-hooks */
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { urlBase, loadingComponent, messageErrorComponent } from './consts';
import pokeballbackground from '../assets/images/pokeballbackground.png';

function Pokedex() {
    let param;
    useParams().offset ? param = useParams().offset : param = 0;

    const [isLoading, setIsLoading] = useState(true);
    const [noPokemonsFound, setNoPokemonsFound] = useState(false);
    const [data, setData] = useState();
    const [nextOffset, setNextOffset] = useState(null);
    const [prevOffset, setPrevOffset] = useState(null);
    const limit = 12;

    useEffect(() => {
        fetch(`${urlBase}/pokemon?offset=${param}&limit=${limit}`)
            .then((res) => res.json())
            .then((response) => {
                setData(response.results);
                setIsLoading(false);
                response.next ? setNextOffset(parseInt(response.next.substring(response.next.search('=') + 1, response.next.search('&')))) : setNextOffset(null);
                response.previous ? setPrevOffset(parseInt(response.previous.substring(response.previous.search('=') + 1, response.previous.search('&')))) : setPrevOffset(null);
            })
            .catch(() => setNoPokemonsFound(true));
    }, [param]);

    return (
        <>
            {isLoading && !noPokemonsFound && loadingComponent}

            {noPokemonsFound && messageErrorComponent(`No pokemons found`)}

            {!isLoading && (
                <div className="page-pokedex">
                    <div className="container my-5">
                        <div className="row">
                            <h1>Accedex</h1>
                        </div>

                        <div className="d-flex py-3">
                            <div className="p-2">
                                <Link className={`btn btn-primary ${prevOffset == null ? 'disabled' : ''}`} to={`/pokedex/${prevOffset}`}><i className="bi bi-arrow-left"></i> Back</Link>
                            </div>

                            <div className="p-2">
                                <Link className={`btn btn-primary ${nextOffset == null ? 'disabled' : ''}`} to={`/pokedex/${nextOffset}`}>Next <i className="bi bi-arrow-right"></i></Link>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row">
                                {
                                    data.map((pokemon, index) => {
                                        return (
                                            <div key={index} className="col-12 col-md-6 col-lg-4 mb-2 hand-above hover-shadow">
                                                <Link to={`/pokemon/${parseInt(pokemon.url.split('/')[6])}`}>
                                                    <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                                                        <img className="card-bg" src={pokeballbackground} alt="pokeball-card" />
                                                        <div>
                                                            <h2 className="card-info-h2 mt-3 text-secondary">{`#${parseInt(pokemon.url.split('/')[6])} ${pokemon.name}`}</h2>
                                                        </div>
                                                        <div className="card-img">
                                                            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${parseInt(pokemon.url.split('/')[6])}.png`} alt={`Imgae ${pokemon.name}`} />
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Pokedex;