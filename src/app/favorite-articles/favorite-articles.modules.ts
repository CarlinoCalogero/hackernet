import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoriteArticlesComponent } from './favorite-articles.component';
import { FavoriteArticlesRoutingModule } from './favorite-articles-routing.module';
import { FavouritesPage } from '../pages/favourites/favourites.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CommentModule } from '../components/comment/comment.module';
import { IframeModule } from '../components/iframe/iframe.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FavoriteArticlesRoutingModule,
        CommentModule,
        IframeModule
      ],
      declarations: [FavouritesPage]
})
export class FavoritesArticlesModule {}