/* eslint-disable @typescript-eslint/no-shadow */
import { ChainLink, NamedAPIResource } from 'pokenode-ts';

export class Evolution {

  id: number;
  simplePokemons: SimplePokemon[] = [];
  babyTriggerItem: string;

  constructor(id: number, chain: ChainLink, babyTriggerItem: NamedAPIResource | null) {

    this.id = id;

    if (babyTriggerItem) {
      this.babyTriggerItem = babyTriggerItem.name;
    }

    // Primera evolución
    this.simplePokemons.push(new SimplePokemon(
      Number(chain.species.url.split('/')[6]),
      chain.species.name,
      chain.evolution_detail,
      1
    ));

    // Segunda evolución
    chain.evolves_to.forEach(evolve => {
      this.simplePokemons.push(new SimplePokemon(
        Number(evolve.species.url.split('/')[6]),
        evolve.species.name,
        evolve.evolution_detail,
        2
      ));

      // Tercera evolución
      evolve.evolves_to.forEach(evolve => {
        this.simplePokemons.push(new SimplePokemon(
          Number(evolve.species.url.split('/')[6]),
          evolve.species.name,
          evolve.evolution_detail,
          3
        ));
      });
    });

   /*  console.log(this) */
  }
}

/* eslint-disable @typescript-eslint/ban-types */
class SimplePokemon {

  id: number;
  name: string;
  evolutionDetails: {};
  evolutionNumber: number;
  url: string;

  constructor(id: number, name: string, evolutionDetails: {}, evolutionNumber: number) {
    this.id = id;
    this.name = name;
    this.evolutionDetails = evolutionDetails;
    this.evolutionNumber = evolutionNumber;
    this.url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
