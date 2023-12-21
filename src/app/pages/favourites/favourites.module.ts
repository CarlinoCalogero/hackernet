import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavouritesPageRoutingModule } from './favourites-routing.module';

import { FavouritesPage } from './favourites.page';
import { ArticleSnippetModule } from 'src/app/components/article-snippet/article-snippet.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavouritesPageRoutingModule,
    ArticleSnippetModule
  ],
  declarations: [FavouritesPage]
})
export class FavouritesPageModule {}
