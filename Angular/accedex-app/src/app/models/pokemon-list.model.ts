export class PokemonList {

  private id: number;
  private name: string;
  private url: string;

  constructor(id: number, name: string, url: string) {
    this.id = id;
    this.name = name;
    this.url = url;
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
}
