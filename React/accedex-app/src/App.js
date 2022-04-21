import './App.css';
import React, { useState } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import { Profile, Register, Login, NotFound, Pokemon, Pokedex, LogOut } from './pages/exports';

/**
 * APP
 */
const App = () => {
  const [pokemonSearch, setPokemonSearch] = useState('');
  const [user, loading, error] = useAuthState(auth);

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
              </ul>
              <div className="d-flex">
                <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" onChange={event => setPokemonSearch(event.target.value)} />
                <Link className="btn btn-outline-success" to={`/pokemon/${pokemonSearch.toLowerCase()}`}>Search</Link>

                {!user && (
                  <>
                    <Link className="btn btn-outline-info ms-5" to="/login">LogIn</Link>
                    <Link className="btn btn-outline-info ms-1" to="/register">Register</Link>
                  </>
                )}

                {user && (
                  <>
                    <Link className="btn btn-outline-info ms-5" to="/profile">Profile</Link>
                    <Link className="btn btn-outline-danger ms-1" to="/singout">SignOut</Link>
                  </>
                )}

              </div>
            </div>
          </div>
        </nav>

        <Routes>
          <Route exact path="/" element={<Pokedex />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:offset" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<Pokemon />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/singout" element={<LogOut />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
