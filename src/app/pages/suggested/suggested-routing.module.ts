import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuggestedPage } from './suggested.page';

const routes: Routes = [
  {
    path: '',
    component: SuggestedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestedPageRoutingModule {}
