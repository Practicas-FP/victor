export class Pokemon {

  id: number;
  name: string;
  url: string;
  types: string[] = [];
  abilities: string;
  height: number;
  weight: number;
  //stats: PokemonStats[] = [];
  moves: string[] = [];
  sprintes: string[] = [];
  baseExperience: number;
  //typesDamage: PokemonTypesDamage[] = [];

  favorite: boolean;
  favoriteKey: string;

  constructor() { }
}
