import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvolutionsPage } from './evolutions.page';

const routes: Routes = [
  {
    path: '',
    component: EvolutionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvolutionsPageRoutingModule {}
