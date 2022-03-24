import { ChainLink } from "pokenode-ts";

class SimplePokemon {

  private id: number;
  private name: string;
  private evolutionDetails: {};
  private evolutionNumber: number;

  constructor(id: number, name: string, evolutionDetails: {}, evolutionNumber: number) {
    this.id = id;
    this.name = name;
    this.evolutionDetails = evolutionDetails;
    this.evolutionNumber = evolutionNumber;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEvolutionDetails() {
    return this.evolutionDetails;
  }

  getEvolutionNumber() {
    return this.evolutionNumber;
  }
}

export class Evolution {

  private id: number;
  private simplePokemons: SimplePokemon[] = [];

  constructor(id: number, chain: ChainLink) {

    this.id = id;

    // Primera evolución
    this.simplePokemons.push(new SimplePokemon(
      parseInt(chain.species.url.split('/')[6]),
      chain.species.name,
      chain.evolution_detail,
      1
    ));

    // Segunda evolución
    chain.evolves_to.forEach(evolve => {
      this.simplePokemons.push(new SimplePokemon(
        parseInt(evolve.species.url.split('/')[6]),
        evolve.species.name,
        evolve.evolution_detail,
        2
      ));

      // Tercera evolución
      evolve.evolves_to.forEach(evolve => {
        this.simplePokemons.push(new SimplePokemon(
          parseInt(evolve.species.url.split('/')[6]),
          evolve.species.name,
          evolve.evolution_detail,
          3
        ));
      });
    });

    console.log(this)
  }

  public getId() {
    return this.id;
  }

  public getSimplePokemons() {
    return this.simplePokemons;
  }
}
