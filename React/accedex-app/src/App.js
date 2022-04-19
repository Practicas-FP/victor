/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/style-prop-object */
/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable no-array-constructor */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import './App.css';
import React, { useState, useEffect } from "react";
import { Link, BrowserRouter as Router, Route, Routes, useParams } from "react-router-dom";
import  pokeballbackground  from './assets/images/pokeballbackground.png';

const App = () => {
  const [pokemonSearch, setPokemonSearch] = useState('');

  return (
    <>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Accedex</Link> 

            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                
                <li className="nav-item">
                  <Link className="nav-link" to="/pokedex">Pokedex</Link> 
                </li>
                {/* <li className="nav-item"> */}
                  {/* <Link className="nav-link" to="/evolutions">Evolutions</Link> */}  
                {/* </li> */}
              </ul>
              <div className="d-flex">
                <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" onChange={event => setPokemonSearch(event.target.value)} />
                <Link className="btn btn-outline-success" to={`/pokemon/${pokemonSearch.toLowerCase()}`}>Search</Link> 

                {/* Solo mostrar si esta logeado */}
                <Link className="btn btn-outline-info ms-5" to="/profile">Profile</Link> 
                <Link className="btn btn-outline-danger ms-1" to="/logout">SignOut</Link> 
              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={<PokedexPage />} />
          <Route path="/pokedex" element={<PokedexPage />} />
          <Route path="/pokedex/:offset" element={<PokedexPage />} />
          <Route path="/pokemon/:id" element={<PokemonPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

/**
 * URL Base
 */
const urlBase = 'https://pokeapi.co/api/v2';

/**
 * Pokedex Page
 */
const PokedexPage = () => {
  let param;
  useParams().offset ? param = useParams().offset : param = 0;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [nextOffset, setNextOffset] = useState();
  const [prevOffset, setPrevOffset] = useState();
  const limit = 12;

  useEffect(() => {
    fetch(`${urlBase}/pokemon?offset=${param}&limit=${limit}`)
      .then((res) => res.json())
      .then((response) => {
        setData(response.results);
        setIsLoading(false);
        if (response.next) setNextOffset(parseInt(response.next.substring(response.next.search('=') + 1, response.next.search('&'))));
        if (response.previous) setPrevOffset(parseInt(response.previous.substring(response.previous.search('=') + 1, response.previous.search('&'))));
      })
      .catch((error) => console.log(error));
  }, [param]);

  return (
    <>
      {!isLoading && 
        <div className="page-pokedex">
          <div className="container my-5">
              <div className="row">
                <h1>Accedex</h1>
              </div>

              {/* *ngIf="pokemonsAPI.loadingData" */}

              {/* *ngIf="pokemonsAPI.pokemons.length" */}
              <div className="d-flex py-3">
                <div className="p-2">
                  <Link className="btn btn-primary" to={`/pokedex/${prevOffset}`}><i className="bi bi-arrow-left"></i> Back</Link>
                </div>

                <div className="p-2">
                  <Link className="btn btn-primary" to={`/pokedex/${nextOffset}`}>Next <i className="bi bi-arrow-right"></i></Link>
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
      }
    </>
  );
};

/**
 * Pokemon Page
 */
const PokemonPage = () => {
  const param = useParams().id;

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    fetch(`${urlBase}/pokemon/${param}`)
      .then((res) => res.json())
      .then((response) => {
        const moves = new Array();
        response.moves.forEach(move => moves.push(move.move.name));

        const types = new Array();
        response.types.forEach(type => types.push(type.type.name))

        const stats = new Array();
        response.stats.forEach(stat => stats.push(
            { name: stat.stat.name, baseStat: stat.base_stat},
        ));

        const sprites = new Array();
        if (response.sprites.front_default)         sprites.push({ name: 'front_default', sprite: response.sprites.front_default });
        if (response.sprites.back_default)          sprites.push({ name: 'back_default', sprite: response.sprites.back_default });
        if (response.sprites.front_female)          sprites.push({ name: 'front_female', sprite: response.sprites.front_female });
        if (response.sprites.back_female)           sprites.push({ name: 'back_female', sprite: response.sprites.back_female });
        if (response.sprites.front_shiny)           sprites.push({ name: 'front_shiny', sprite: response.sprites.front_shiny});
        if (response.sprites.back_shiny)            sprites.push({ name: 'back_shiny', sprite: response.sprites.back_shiny});
        if (response.sprites.front_shiny_female)    sprites.push({ name: 'front_shiny_female', sprite: response.sprites.front_shiny_female});
        if (response.sprites.back_shiny_female)     sprites.push({ name: 'back_shiny_female', sprite: response.sprites.back_shiny_female});

        
        setData({
          'id': response.id,
          'name': response.name,
          'height': response.height,
          'weight': response.weight,
          'baseExperience': response.base_experience,
          'moves': moves,
          'types': types,
          'stats': stats,
          'sprites': sprites
        });
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [param]);

  return (
    <>
      {!isLoading && (
        <>
          <div key={data.id} className="page-pokemon">
            <div className="container my-5">
              {/* *ngIf="pokemonsAPI.loadingData" */}

              {/* comprobar si hay datos o no */}

              <div className="row">
                <div className="col">
                  <h1 className="font-weight-bold"><b>#{ data.id }</b></h1>
                </div>

                <div className="col d-flex flex-row-reverse">
                  <button className="btn btn-outline-primary"><i className="bi bi-heart-fill"></i></button>

                  <button className="btn btn-outline-danger"><i className="bi bi-heart-fill"></i></button>
                </div>
              </div>

              <div className="d-flex py-3">
                <div className="p-2">
                  <Link className={'btn btn-primary'} to={`/pokemon/${data.id - 1}`}><i className="bi bi-arrow-left"></i> Back</Link>
                </div>

                <div className="p-2">
                  <Link className="btn btn-primary" to={`/pokemon/${data.id + 1}`}>Next <i className="bi bi-arrow-right"></i></Link>
                </div>
              </div>

              <div className="container">
                <div className="row py-4">
                  <div className="col-12 col-lg-4 bg-white mb-3 rounded box-shadow d-flex flex-column justify-content-center">
                    <span className="mr-3 text-center">
                      {/* carousel imgs */}
                      <img className="d-block w-100" src={data.sprites[0].sprite} alt={data.sprites[0].name}></img>
                      
                      <h2 className="mt-4 pb-3 text-capitalize">
                        <span className="font-weight-bold"><b>{ data.name }</b></span>
                      </h2>
                    </span>
                  </div>

                  <div className="col-12 col-lg-8 h-100">
                    <div className="pl-4 bg-white rounded box-shadow p-5">
                      <p className="font-weight-bold"><b>Types:</b> </p>
                      { 
                        data.types.map((type, index) => (
                          <span key={`type-${index}`} className={type + ' color-white info-span p-1 px-5'}>
                            { type }
                          </span>
                        ))
                      }

                      <p className="mt-2">
                        <span className="font-weight-bold"><b>Height:</b> </span> { data.height + ' | '} 
                        <span className="font-weight-bold"><b>Weight:</b> </span> { data.weight }
                      </p>

                      <p>
                        <span className="font-weight-bold"><b>Base experience:</b></span> { data.baseExperience }
                      </p>
                    </div>
                  </div>

                  <div className="row pt-4">
                    <h2>Stats</h2>
                    { 
                      data.stats.map((stat, index) => (
                        <div key={`stat-${index}`} className="progress mt-3 h-25">
                          <div className={data.types[0] + ' progress-bar'} style={{width: stat.baseStat+'%'}} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                            <span className="text-uppercase">{stat.name + ' : ' } <span className="font-weight-bold"><b>{ stat.baseStat }</b></span></span>
                          </div>
                        </div>
                      ))
                    }
                  </div>

                  <div style={{marginTop: '275px'}}  className="row pt-4 justify-content-center">
                    <h2>Moves</h2>
                    {
                      data.moves.map((move, index) => (
                        <span key={`move-${index}`} className={data.types[0] + ' color-white info-move me-2 mt-2'}>{ move }</span>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

/**
 * Not Found
 */
 const NotFound = () => {
   return (
     <>
     <div className="pt-5 d-flex justify-content-center align-items-center" id="main">
        <h1 className="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
        <div className="inline-block align-middle">
            <h2 className="font-weight-normal lead" id="desc"> The page you requested was not found.</h2>
        </div>
      </div>
     </>
   );
 }

export default App;
