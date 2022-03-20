export class Pokemon {

    private id: number;
    private name: string;
    private url: string | null;
    private types: string[];

    constructor(id: number, name: string, url: string | null, types: string[]) {
        this.id = id;
        this.name = this.capitalizarPrimeraLetra(name);
        this.url = url;
        this.types = types;
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

    private capitalizarPrimeraLetra(name: string) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    }
}