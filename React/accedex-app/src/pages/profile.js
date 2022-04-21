/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase-auth";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");
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

                                    <h2 className="mt-4 pb-3">Hello, <span className="fw-bold">{user.displayName.split(' ')[0] || 'Null'}</span></h2>
                                </span>
                            </div>

                            <div className="col-12 col-lg-8" style={{ height: '100%' }}>
                                <div className="pl-4 bg-white rounded box-shadow p-5">
                                    <p><span className="fw-bold">Name:</span> {user.displayName.split(' ')[0] || 'Null'}</p>
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
                        
                    </div>
                </div>
            )}

        </>
    );
}

export default Profile;