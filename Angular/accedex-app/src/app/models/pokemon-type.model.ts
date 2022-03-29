export class PokemonType {

  private name: string;

  // damage relations
  private doubleDamageFrom: string[] = [];
  private doubleDamageTo: string[] = [];
  private halfDamageFrom: string[] = [];
  private halfDamageTo: string[] = [];
  private noDamageFrom: string[] = [];
  private noDamageTo: string[] = [];

  constructor(name: string, doubleDamageFrom: any[], doubleDamageTo: any[], halfDamageFrom: any[], halfDamageTo: any[], noDamageFrom: any[], noDamageTo: any[]) {
    this.name = name;

    if (doubleDamageFrom) {
      doubleDamageFrom.forEach(damage => this.doubleDamageFrom.push(damage.name));
    }

    if (doubleDamageTo) {
      doubleDamageTo.forEach(damage => this.doubleDamageTo.push(damage.name));
    }

    if (halfDamageFrom) {
      halfDamageFrom.forEach(damage => this.halfDamageFrom.push(damage.name));
    }

    if (halfDamageTo) {
      halfDamageTo.forEach(damage => this.halfDamageTo.push(damage.name));
    }

    if (noDamageFrom) {
      noDamageFrom.forEach(damage => this.noDamageFrom.push(damage.name));
    }

    if (noDamageTo) {
      noDamageTo.forEach(damage => this.noDamageTo.push(damage.name));
    }
  }

  public getName() {
    return this.name;
  }

  public getDoubleDamageFrom() {
    return this.doubleDamageFrom;
  }

  public getDoubleDamageTo() {
    return this.doubleDamageTo;
  }

  public getHalfDamageFrom() {
    return this.halfDamageFrom;
  }

  public getHalfDamageTo() {
    return this.halfDamageTo;
  }

  public getNoDamageFrom() {
    return this.noDamageFrom;
  }

  public getNoDamageTo() {
    return this.noDamageTo;
  }
}
