import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuggestedArticlesComponent } from './suggested-articles.component';

const routes: Routes = [
  {
    path: 'suggested-articles',
    component: SuggestedArticlesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuggestedArticlesRoutingModule {}