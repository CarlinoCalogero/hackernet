import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteArticlesComponent } from './favorite-articles.component';

const routes: Routes = [
  {
    path: 'suggested-articles',
    component: FavoriteArticlesComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteArticlesRoutingModule {}