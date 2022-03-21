export class PokemonStat {

  private baseStat: number;
  private name: string;

  constructor(baseStat: number, name: string) {
    this.baseStat = baseStat;
    this.name = name;
  }

  public getBaseStat() {
    return this.baseStat;
  }

  public getName() {
    return this.name;
  }
}
