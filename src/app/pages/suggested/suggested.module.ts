import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuggestedPageRoutingModule } from './suggested-routing.module';

import { SuggestedPage } from './suggested.page';
import { ArticleSnippetModule } from 'src/app/components/article-snippet/article-snippet.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestedPageRoutingModule,
    ArticleSnippetModule
  ],
  declarations: [SuggestedPage]
})
export class SuggestedPageModule {}
