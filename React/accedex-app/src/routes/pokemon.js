import { useParams } from 'react-router-dom';
import { getPokemon, pokemon, loadingData } from '../services/pokeAPI.service';

export default function Pokemon() {

  const param = useParams().pokemonId;
  getPokemon(param);

  const pokemon = {
    id: 1,
    name: 'name',
    height: 100,
    weight: 200,
    baseExperience: 64,
    moves: ['move-1', 'move-2', 'move-3'],
    types: ['grass', 'fire'],
    stats: [
      { name: 'Stat 1', baseStat: 45},
      { name: 'Stat 2', baseStat: 77},
    ],
    sprites: [
      { name: 'sprite 1', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
      { name: 'sprite 2', sprite: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png' }
    ]
  };

  const sprites = pokemon.sprites.map((sprite, i) => (
    <div className="carousel-item">
      <img className="d-block w-100" src={sprite.sprite} alt={sprite.name} />
    </div>
  ));

  const types = pokemon.types.map(type => (
    <span className={type + ' color-white info-span p-1 px-5'}>
      { type }
    </span>
  ));

  const stats = pokemon.stats.map(stat => (
    <div className="progress mt-3 h-25">
      <div className={pokemon.types[0] + ' progress-bar w-' + stat.baseStat} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
        <span className="text-uppercase">{stat.name + ' : ' } <span className="font-weight-bold"><b>{ stat.baseStat }</b></span></span>
      </div>
    </div>
  ));

  const moves = pokemon.moves.map(move => (
      <span className={pokemon.types[0] + ' color-white info-move me-2 mt-2'}>{ move }</span>
  ));

  return (
    <div className="page-pokemon">
      <div className="container my-5">
        {/* *ngIf="pokemonsAPI.loadingData" */}

        {/* Aqui comprobar si hay datos o no */}

        <div className="row">
          <div className="col">
            <h1 className="font-weight-bold"><b>#{ pokemon.id }</b></h1>
          </div>

          <div className="col d-flex flex-row-reverse">
            <button className="btn btn-outline-primary"><i className="bi bi-heart-fill"></i></button>

            <button className="btn btn-outline-danger"><i className="bi bi-heart-fill"></i></button>
          </div>
        </div>

        <div className="d-flex py-3">
          <div className="p-2">
            <button className="btn btn-primary">
              <i className="bi bi-arrow-left"></i> Back
            </button>
          </div>

          <div className="p-2">
            <button className="btn btn-primary">
              Next <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="container">
          <div className="row py-4">
            <div className="col-12 col-lg-4 bg-white mb-3 rounded box-shadow d-flex flex-column justify-content-center">
              <span className="mr-3 text-center">
                {/* carousel imgs */}
                <img className="d-block w-100" src={pokemon.sprites[0].sprite} alt={pokemon.sprites[0].name}></img>
                
                <h2 className="mt-4 pb-3 text-capitalize">
                  <span className="font-weight-bold"><b>{ pokemon.name }</b></span>
                </h2>
              </span>
            </div>

            <div className="col-12 col-lg-8 h-100">
              <div className="pl-4 bg-white rounded box-shadow p-5">
                <p className="font-weight-bold"><b>Types:</b> </p>
                { types }

                <p className="mt-2">
                  <span className="font-weight-bold"><b>Height:</b> </span> { pokemon.height + ' | '} 
                  <span className="font-weight-bold"><b>Weight:</b> </span> { pokemon.weight }
                </p>

                <p>
                  <span className="font-weight-bold"><b>Base experience:</b></span> { pokemon.baseExperience }
                </p>
              </div>
            </div>

            <div className="row pt-4">
              <h2>Stats</h2>
              { stats }
            </div>

            <div className="row pt-4 justify-content-center">
              <h2>Moves</h2>
              { moves }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}