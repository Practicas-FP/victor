/* eslint-disable max-len */
import { PokemonSprites } from 'pokenode-ts';
import { PokemonStat } from './pokemon-stat-model';
import { PokemonTypesDamage } from './pokemon-type.model';

export class Pokemon {

  id: number;
  name: string;
  url: string;
  types: string[] = [];
  abilities: string[] = [];
  height: number;
  weight: number;
  stats: PokemonStat[] = [];
  moves: string[] = [];
  sprintes: string[] = [];
  baseExperience: number;
  typesDamage: PokemonTypesDamage[] = [];

  favorite: boolean;
  favoriteKey: string;

  constructor(id: number, name: string, url: string | null, types: any[], moreData: boolean, abilities: any[], height: number, weight: number, stats: any[], moves: any[], sprites: PokemonSprites | null, baseExperience: number, favorite: boolean, favoriteKey: string | undefined | null) {
    this.id = id;
    this.name = name;
    this.url = url;
    types.forEach(type => this.types.push(type.type.name));
    this.favorite = favorite;

    if (favoriteKey) {
      this.favoriteKey = favoriteKey;
    }

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
        if (sprites.front_default) { this.sprintes.push(sprites.front_default); }
        if (sprites.back_default) { this.sprintes.push(sprites.back_default); }
        if (sprites.back_female) { this.sprintes.push(sprites.back_female); }
        if (sprites.back_shiny) { this.sprintes.push(sprites.back_shiny); }
        if (sprites.back_shiny_female) { this.sprintes.push(sprites.back_shiny_female); }
        if (sprites.front_female) { this.sprintes.push(sprites.front_female); }
        if (sprites.front_shiny) { this.sprintes.push(sprites.front_shiny); }
        if (sprites.front_shiny_female) { this.sprintes.push(sprites.front_shiny_female); }
      }
    }
  }

  public setTypeDamage(typesDamage: PokemonTypesDamage) {
    this.typesDamage.push(typesDamage);
  }
}
