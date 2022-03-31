import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvolutionsPageRoutingModule } from './evolutions-routing.module';

import { EvolutionsPage } from './evolutions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvolutionsPageRoutingModule
  ],
  declarations: [EvolutionsPage]
})
export class EvolutionsPageModule {}
