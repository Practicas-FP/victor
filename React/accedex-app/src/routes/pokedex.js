import { NavLink } from 'react-router-dom';

export default function Pokedex() {
    return (
        <div class="page-pokedex">
            <div class="container my-5">
                <div class="row">
                    <h1>Accedex</h1>
                </div>


                {/* Para redirigir a un Pokemon 
                <NavLink
                    style={({ isActive }) => {
                        return {
                            display: "block",
                            margin: "1rem 0",
                            color: isActive ? "red" : "",
                        };
                    }}
                    to={`/pokemon/1`}
                    key={'1'}
                    >
                        {'pokemon.name'}
                </NavLink>
                */}

            </div>
        </div>
    );
  }