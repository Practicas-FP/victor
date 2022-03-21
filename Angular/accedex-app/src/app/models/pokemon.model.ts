import { PokemonStat } from "./pokemon-stat.model";

export class Pokemon {

  private id: number;
  private name: string;
  private url: string | null;
  private types: string[] = [];
  private color: string;
  private abilities: string[] = [];
  private height: number;
  private weight: number;
  private stats: PokemonStat[] = [];
  private moves: string[] = [];

  constructor(id: number, name: string, url: string | null, types: any[], moreData: boolean, abilities: any[], height: number, weight: number, stats: any[], moves: any[]) {
    this.id = id;
    this.name = name;
    this.url = url;
    types.forEach(type => this.types.push(type.type.name));
    this.color = this.setColor(this.types[0]);

    // More data
    if (moreData) {
      abilities.forEach(ability => this.abilities.push(ability.ability.name));
      this.height = height;
      this.height = weight;
      stats.forEach(stat => this.stats.push(new PokemonStat(
        stat.base_stat,
        stat.stat.name
      )));
      moves.forEach(move => this.moves.push(move.move.name));
      // se podría poner tipo un carrusel de imágenes
    }
  }

  public getId() {
    return this.id;
  }

  public getName() {
    return this.name;
  }

  public getUrl() {
    return this.url;
  }

  public getTypes() {
    return this.types;
  }

  public getColor() {
    return this.color;
  }

  public getStats() {
    return this.stats;
  }

  private setColor(color: string): string {
    switch (color) {
      case 'grass':
        return '#7EB95B';
      case 'fire':
        return '#FD5D5C';
      case 'water':
        return '#5BA6D2';
      case 'normal':
        return '#DDDBC6';
      case 'flying':
        return '#93D0CB';
      case 'bug':
        return '#BDDD6E';
      case 'poison':
        return '#C565E4';
      case 'electric':
        return '#FFFB6D';
      case 'ground':
        return '#EDE293';
      case 'fighting':
        return '#EF6165';
      case 'psychic':
        return '#F55792';
      case 'rock':
        return '#94834F';
      case 'ice':
        return '#65B8C0';
      case 'ghost':
        return '#B38DC2';
      case 'dragon':
        return '#B18DFD';
      case 'dark':
        return '#916852';
      case 'steel':
        return '#BBC5C4';
      case 'fairy':
        return '#FDD1E0';
      case 'gray':
        return '#D8D8D8';
      default:
        return '#FFFFFF';
    }
  }
}
