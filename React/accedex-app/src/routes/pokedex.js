import {React/* , useState, useEffect */} from 'react';
import { NavLink } from 'react-router-dom';
import { getPokemonList, pokemonsList, noDataFound, loadingData } from '../services/pokeAPI.service';
import  pokeballbackground  from '../assets/images/pokeballbackground.png';

export default class Pokedex extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = { pokemons: [] };
      }

    componentDidMount() {
        getPokemonList(0, 12);
    }
    
    render() {
        const pokemons = pokemonsList.map((pokemon) => (
            <div className="col-12 col-md-6 col-lg-4 mb-2 hand-above hover-shadow">
                <div className="card { pokemon.type }">
                    <img className="card-bg" src={pokeballbackground} alt="pokeball-card" />
                    <div>
                        <h2 className="color-white card-info-h2 mt-3">{`#${pokemon.id} ${pokemon.name}`}</h2>
                        <span className="color-white card-info-span">{ pokemon.type }</span>
                    </div>
                    <div className="card-img">
                        <img src={pokemon.sprite} />
                    </div>
                </div>
            </div> 
        ));

        return (
            <div className="page-pokedex">
                <div className="container my-5">
                    <div className="row">
                        <h1>Accedex</h1>
                    </div>

                    {/* *ngIf="pokemonsAPI.loadingData" */}

                    {/* *ngIf="pokemonsAPI.pokemons.length" */}

                    <div className="container">
                        {/* Aqui comprobar si hay datos o no */}
                        <div className="row">
                            { pokemons }
                        </div>
                    </div>

                </div>
            </div>
        );
    }
  }