/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase-auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllFav } from "../services/firebase-favorite";
import pokeballbackground from '../assets/images/pokeballbackground.png';
import { loadingComponent, messageErrorComponent } from "../services/consts";
import ReactPaginate from 'react-paginate';

function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [noPokemonsFound, setNoPokemonsFound] = useState(false);
    const [data, setData] = useState();
    const [paginate, setPaginate] = useState();
    const [pageCount, setPageCount] = useState(0);

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");

        getAllFav(user.uid, setIsLoading, setData, setNoPokemonsFound, setPaginate, setPageCount);
    }, [user, loading]);

    return (
        <>
            {user && (
                <div className="page-users">
                    <div className="container my-5">
                        <div className="row pt-5">
                            <h1>Profile</h1>
                        </div>

                        <div className="row py-4">
                            <div className="col-12 col-lg-4 bg-white mb-3 rounded box-shadow d-flex flex-column justify-content-center mt-3">
                                <span className="mr-3 text-center">
                                    <img src={user.photoURL || 'https://via.placeholder.com/300x300.png?text=No+image'} alt="Image profile" width="300" height="300" style={{ objectFit: 'cover' }} />

                                    <h2 className="mt-4 pb-3">Hello, <span className="fw-bold">{user.displayName ? user.displayName.split(' ')[0] : 'Null'}</span></h2>
                                </span>
                            </div>

                            <div className="col-12 col-lg-8" style={{ height: '100%' }}>
                                <div className="pl-4 bg-white rounded box-shadow p-5">
                                    <p><span className="fw-bold">Name:</span> {user.displayName ? user.displayName.split(' ')[0] : 'Null'}</p>
                                    <p><span className="fw-bold">Surnames:</span> {user.displayName ? `${user.displayName.split(' ')[1]} ${user.displayName.split(' ')[2]}` : 'Null'}</p>
                                    <p><span className="fw-bold">Email:</span> {user.email}</p>
                                    <p><span className="fw-bold">User ID:</span> {user.uid}</p>
                                    <p><span className="fw-bold">Email Verified:</span> {user.emailVerified ? 'Yes' : 'No'}</p>

                                    <Link className="btn btn-lg btn-danger" to="/singout">SignOut</Link>
                                </div>
                            </div>
                        </div>

                        <div className="row pt-5">
                            <h3>Favorite Pokemon</h3>
                        </div>

                        {isLoading && !noPokemonsFound && loadingComponent}

                        {noPokemonsFound && messageErrorComponent(`No pokemon favs`)}

                        <div className="container">
                            <div className="row">
                                {!isLoading && data && (
                                    data.map((pokemon, index) => {
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
                                    })
                                    
                                        /* { paginate.pokemons }
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="next >"
                                            onPageChange={paginate.handlePageClick}
                                            pageRangeDisplayed={5}
                                            pageCount={pageCount}
                                            previousLabel="< previous"
                                            renderOnZeroPageCount={null}
                                        /> */
                                    
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;