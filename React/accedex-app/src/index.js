import React from 'react';
import './index.css';
import { render } from 'react-dom';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Pokedex from './routes/pokedex';
import Pokemon from './routes/pokemon';
import NotFound from './routes/not-found';
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="pokedex" element={<Pokedex />} />

        <Route path="pokemon" element={<Pokemon />}>
          <Route path=":pokemonId" element={<Pokemon />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
