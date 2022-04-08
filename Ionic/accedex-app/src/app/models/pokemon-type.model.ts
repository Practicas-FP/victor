/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
export class PokemonTypesDamage {

  private name: string;

  // damage relations
  doubleDamageFrom: string[] = [];
  doubleDamageTo: string[] = [];
  halfDamageFrom: string[] = [];
  halfDamageTo: string[] = [];
  noDamageFrom: string[] = [];
  noDamageTo: string[] = [];

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
}
