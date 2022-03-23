import { PokemonSprites } from "pokenode-ts";
import { PokemonStat } from "./pokemon-stat.model";
import { PokemonType } from "./pokemon-type.model";

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
  private sprintes: string[] = [];
  private baseExperience: number;
  private typesDamage: PokemonType[] = [];

  constructor(id: number, name: string, url: string | null, types: any[], moreData: boolean, abilities: any[], height: number, weight: number, stats: any[], moves: any[], sprites: PokemonSprites | null, baseExperience: number) {
    this.id = id;
    this.name = name;
    this.url = url;
    types.forEach(type => this.types.push(type.type.name));
    this.color = this.setColor(this.types[0]);

    // More data
    if (moreData) {
      abilities.forEach(ability => this.abilities.push(ability.ability.name));

      this.height = height;
      this.weight = weight;
      this.baseExperience = baseExperience;

      stats.forEach(stat => this.stats.push(new PokemonStat(
        stat.base_stat,
        stat.stat.name
      )));

      moves.forEach(move => this.moves.push(move.move.name));

      if (sprites) {
        if (sprites.back_default) this.sprintes.push(sprites.back_default);
        if (sprites.back_female) this.sprintes.push(sprites.back_female);
        if (sprites.back_shiny) this.sprintes.push(sprites.back_shiny);
        if (sprites.back_shiny_female) this.sprintes.push(sprites.back_shiny_female);
        if (sprites.front_default) this.sprintes.push(sprites.front_default);
        if (sprites.front_female) this.sprintes.push(sprites.front_female);
        if (sprites.front_shiny) this.sprintes.push(sprites.front_shiny);
        if (sprites.front_shiny_female) this.sprintes.push(sprites.front_shiny_female);
      }
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

  public getHeight() {
    return this.height;
  }

  public getWeight() {
    return this.weight;
  }

  public getAbilities() {
    return this.abilities;
  }

  public getMoves() {
    return this.moves;
  }

  public getBaseExperience() {
    return this.baseExperience;
  }

  public getSprintes() {
    return this.sprintes;
  }

  public setTypeDamage(typesDamage: PokemonType) {
    this.typesDamage.push(typesDamage);
  }

  public getTypesDamage() {
    return this.typesDamage;
  }

  public getColorByType(type: string) {
    return this.setColor(type);
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
