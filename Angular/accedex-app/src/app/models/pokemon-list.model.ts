export class PokemonList {

  id: number;
  name: string;
  url: string;

  constructor(id: number, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getUrl() {
    return this.url;
  }
}
