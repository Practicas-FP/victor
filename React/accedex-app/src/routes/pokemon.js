import { useParams } from 'react-router-dom';

export default function Pokemon() {
    let params = useParams();
    return <h2>Pokemon {params.pokemonId}</h2>;
  }