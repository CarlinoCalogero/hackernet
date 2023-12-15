import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArticlePageRoutingModule } from './article-routing.module';

import { ArticlePage } from './article.page';
import { CommentModule } from 'src/app/components/comment/comment.module';
import { IframeModule } from 'src/app/components/iframe/iframe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArticlePageRoutingModule,
    CommentModule,
    IframeModule
  ],
  declarations: [ArticlePage]
})
export class ArticlePageModule {}
