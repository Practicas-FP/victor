/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FbService } from 'src/app/services/fb.service';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit/*, AfterViewInit*/ {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    public pokeAPI: PokeapiService,
    public firebaseService: FbService,
    public navCtrl: NavController) {

    //console.log('CONSTRUCTOR');
  }

  ngOnInit() {
    //console.log('NG-ON-INIT');

    const param = this.activatedRoute.snapshot.paramMap.get('id');

    if (Number(param)) {
      this.pokeAPI.getPokemonById(Number(param));
    } else {
      this.pokeAPI.getPokemonByName(param);
    }
  }

  addFav() {
    this.firebaseService.addPokeFav(this.pokeAPI.pokemon.id);
    this.pokeAPI.pokemon.favorite = true;
  }

  removeFav() {
    this.firebaseService.deletePokeFav(this.pokeAPI.pokemon.favoriteKey);
    this.pokeAPI.pokemon.favorite = false;
    this.pokeAPI.pokemon.favoriteKey = '';
  }

  // Grafico stats
  /*@ViewChild('barCanvas') private barCanvas: ElementRef;
  barChart: any;

  ionViewWillEnter() {
    this.barChartMethod();

  }

  ngAfterViewInit() {
    //this.barChartMethod();
  }

  barChartMethod() {
    setTimeout(() => {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['BJP', 'INC', 'AAP', 'CPI', 'CPI-M', 'NCP'],
        datasets: [{
          label: '# of Votes',
          data: [200, 50, 30, 15, 20, 34],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    });
  }, 1000);
  }*/
}
