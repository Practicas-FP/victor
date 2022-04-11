import { NavLink, Outlet } from 'react-router-dom';

export default function Pokedex() {
    return (
      <main style={{ padding: "1rem 0" }}>
        <h2>Pokedex</h2>

        {/* Para redirigir a un Pokemon */}
        
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

          <Outlet />
      </main>
    );
  }