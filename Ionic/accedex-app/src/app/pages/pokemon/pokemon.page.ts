/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Chart } from 'chart.js';
import { PokeapiService } from 'src/app/services/pokeapi.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.page.html',
  styleUrls: ['./pokemon.page.scss'],
})
export class PokemonPage implements OnInit/*, AfterViewInit*/ {

  private id: number;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };

  // eslint-disable-next-line max-len
  constructor(private activatedRoute: ActivatedRoute, public toastController: ToastController, public pokeAPI: PokeapiService) { }

  ngOnInit() {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    this.pokeAPI.getPokemonById(this.id);
  }

  addFav() {
    this.presentToast('Pokemon added to favorite');
  }

  removeFav() {
    this.presentToast('Pokemon removed to favorite');
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
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
