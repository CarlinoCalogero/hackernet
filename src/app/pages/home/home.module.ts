import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { ArticleSnippetBetterApiModule } from 'src/app/components/article-snippet-better-api/article-snippet-better-api.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ArticleSnippetBetterApiModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
