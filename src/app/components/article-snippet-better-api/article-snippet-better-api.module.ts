import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleSnippetBetterApiComponent } from './component/article-snippet-better-api.component';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ArticleSnippetBetterApiComponent],
  exports: [ArticleSnippetBetterApiComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipeModule,
  ]
})
export class ArticleSnippetBetterApiModule { }
