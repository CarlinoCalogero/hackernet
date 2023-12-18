import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleSnippetComponent } from './components/article-snippet/article-snippet.component';
import { PipeModule } from 'src/app/pipes/pipe.module';

@NgModule({
  declarations: [ArticleSnippetComponent],
  exports: [ArticleSnippetComponent],
  imports: [
    PipeModule,
    CommonModule
  ]
})
export class ArticleSnippetModule { }
