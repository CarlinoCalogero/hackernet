import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalStatsPage } from './personal-stats.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalStatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalStatsPageRoutingModule {}
