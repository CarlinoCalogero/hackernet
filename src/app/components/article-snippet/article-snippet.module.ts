import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleSnippetComponent } from './components/article-snippet/article-snippet.component';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ArticleSnippetComponent],
  exports: [ArticleSnippetComponent],
  imports: [
    PipeModule,
    CommonModule,
    IonicModule
  ]
})
export class ArticleSnippetModule { }
