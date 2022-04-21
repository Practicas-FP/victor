/* eslint-disable no-array-constructor */
import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { urlBase, loadingComponent, messageErrorComponent } from '../services/consts';

function Pokemon() {
    const param = useParams().id;

    const [isLoading, setIsLoading] = useState(true);
    const [noPokemonFound, setNoPokemonFound] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        fetch(`${urlBase}/pokemon/${param}`)
            .then((res) => res.json())
            .then((response) => {
                const moves = new Array();
                response.moves.forEach(move => moves.push(move.move.name));

                const types = new Array();
                response.types.forEach(type => types.push(type.type.name));

                const statsColors = ['bg-success', 'bg-danger', 'bg-warning', 'bg-danger', 'bg-warning', 'bg-info'];
                const stats = new Array();
                response.stats.forEach((stat, index) => stats.push(
                    { name: stat.stat.name, baseStat: stat.base_stat, color: statsColors[index] },
                ));

                const sprites = new Array();
                if (response.sprites.front_default) sprites.push({ name: 'front_default', sprite: response.sprites.front_default });
                if (response.sprites.back_default) sprites.push({ name: 'back_default', sprite: response.sprites.back_default });
                if (response.sprites.front_female) sprites.push({ name: 'front_female', sprite: response.sprites.front_female });
                if (response.sprites.back_female) sprites.push({ name: 'back_female', sprite: response.sprites.back_female });
                if (response.sprites.front_shiny) sprites.push({ name: 'front_shiny', sprite: response.sprites.front_shiny });
                if (response.sprites.back_shiny) sprites.push({ name: 'back_shiny', sprite: response.sprites.back_shiny });
                if (response.sprites.front_shiny_female) sprites.push({ name: 'front_shiny_female', sprite: response.sprites.front_shiny_female });
                if (response.sprites.back_shiny_female) sprites.push({ name: 'back_shiny_female', sprite: response.sprites.back_shiny_female });


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
            .catch(() => setNoPokemonFound(true));
    }, [param]);

    return (
        <>
            {isLoading && !noPokemonFound && loadingComponent}

            {noPokemonFound && messageErrorComponent(`No pokemon found: ${param}`)}

            {!isLoading && (
                <>
                    <div key={data.id} className="page-pokemon">
                        <div className="container my-5">

                            <div className="row">
                                <div className="col">
                                    <h1 className="font-weight-bold"><b>#{data.id}</b></h1>
                                </div>

                                <div className="col d-flex flex-row-reverse">
                                    <button className="btn btn-outline-primary"><i className="bi bi-heart-fill"></i></button>

                                    <button className="btn btn-outline-danger"><i className="bi bi-heart-fill"></i></button>
                                </div>
                            </div>

                            <div className="d-flex py-3">
                                <div className="p-2">
                                    <Link className={`btn btn-primary ${(data.id - 1) ? '' : 'disabled'}`} to={`/pokemon/${data.id - 1}`} onClick={() => { setIsLoading(true) }}><i className="bi bi-arrow-left"></i> Back</Link>
                                </div>

                                <div className="p-2">
                                    <Link className="btn btn-primary" to={`/pokemon/${data.id + 1}`}>Next <i className="bi bi-arrow-right" onClick={() => { setIsLoading(true) }}></i></Link>
                                </div>
                            </div>

                            <div className="container">
                                <div className="row py-4">
                                    <div className="col-12 col-lg-4 bg-white mb-3 rounded box-shadow d-flex flex-column justify-content-center">
                                        <span className="mr-3 text-center">
                                            {/* carousel imgs */}
                                            <img className="d-block w-100" src={data.sprites[0].sprite} alt={data.sprites[0].name}></img>

                                            <h2 className="mt-4 pb-3 text-capitalize">
                                                <span className="font-weight-bold"><b>{data.name}</b></span>
                                            </h2>
                                        </span>
                                    </div>

                                    <div className="col-12 col-lg-8 h-100">
                                        <div className="pl-4 bg-white rounded box-shadow p-5">
                                            <p className="font-weight-bold"><b>Types:</b> </p>
                                            {
                                                data.types.map((type, index) => (
                                                    <span key={`type-${index}`} className={type + ' color-white info-span p-1 px-5'}>
                                                        {type}
                                                    </span>
                                                ))
                                            }

                                            <p className="mt-2">
                                                <span className="font-weight-bold"><b>Height:</b> </span> {data.height + ' | '}
                                                <span className="font-weight-bold"><b>Weight:</b> </span> {data.weight}
                                            </p>

                                            <p>
                                                <span className="font-weight-bold"><b>Base experience:</b></span> {data.baseExperience}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="row pt-4">
                                        <h2>Stats</h2>
                                        {
                                            data.stats.map((stat, index) => (
                                                <div key={`stat-${index}`} style={{ height: '35px' }}>
                                                    <div className={`progress-bar ${stat.color}`} style={{ width: stat.baseStat + '%', maxWidth: '100%' }} role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                                                        <span className="text-uppercase">{stat.name + ' : '} <span className="font-weight-bold"><b>{stat.baseStat}</b></span></span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                    <div style={{ marginTop: '30px' }} className="row pt-4 justify-content-center">
                                        <h2>Moves</h2>
                                        {
                                            data.moves.map((move, index) => (
                                                <span key={`move-${index}`} className={data.types[0] + ' color-white info-move me-2 mt-2 col-2'}>{move}</span>
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
}

export default Pokemon;