import './App.css';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/">Accedex</Link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            
            <li class="nav-item">
              <Link class="nav-link" to="/pokedex">Pokedex</Link> 
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/evolutions">Evolutions</Link> 
            </li>
          </ul>
          <div class="d-flex">
            <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
            <Link class="btn btn-outline-success" to={`/pokemon/1`} key={'1'}>Search</Link>

            {/* Solo mostrar si esta logeado */}
            <Link class="btn btn-outline-info ms-5" to="/profile">Profile</Link>
            <Link class="btn btn-outline-danger ms-1" to="/logout">SignOut</Link>
          </div>
        </div>
      </div>
      </nav>
      
      <Outlet />
    </div>
  );
}

export default App;
