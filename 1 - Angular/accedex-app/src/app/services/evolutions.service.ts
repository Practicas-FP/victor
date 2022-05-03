import { Injectable } from '@angular/core';
import { EvolutionClient } from 'pokenode-ts';
import { Evolution } from '../models/evolution.model';

@Injectable({
  providedIn: 'root'
})
export class EvolutionsService {

  nextOffset: number = 0;
  previousOffset: number = 0;
  private limit: number = 500;
  loadingData: boolean = true;
  noDataFound: boolean = false;
  evolutions: Evolution[] = [];

  show() {
    this.loadingData = true;
  }

  hide() {
    this.loadingData = false;
  }

  getEvolutions(offset: number) {
    this.clearPokemons();

    (async () => {
      const api = new EvolutionClient();

      this.loadingData = true;

      await
        api.listEvolutionChains(offset, this.limit)
          .then(data => {
            if (data.next)
              this.nextOffset = parseInt(data.next.substring(data.next.search('=') + 1, data.next.search('&')));

            if (data.previous)
              this.previousOffset = parseInt(data.previous.substring(data.previous.search('=') + 1, data.previous.search('&')));

            if (data.results)
              data.results.forEach(evolutionChain => this.getEvolutionById(parseInt(evolutionChain.url.split('/')[6])));
          })
          .catch(error => {
            this.noDataFound = true;
            console.error(error);
          });
    })();
  }

  getEvolutionById(id: number) {
    (async () => {
      const api = new EvolutionClient();

      await
        api.getEvolutionChainById(id)
          .then(data => this.evolutions.push(new Evolution(data.id, data.chain, data.baby_trigger_item)))
          .catch(error => {
            this.noDataFound = true;
            console.error(error);
          })
          .finally(() => this.loadingData = false);
    })();
  }

  clearPokemons() {
    this.evolutions = [];
  }
}
