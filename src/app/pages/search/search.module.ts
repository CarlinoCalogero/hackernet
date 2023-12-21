import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchPageRoutingModule } from './search-routing.module';
import { SearchPage } from './search.page';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { ArticleSnippetBetterApiModule } from 'src/app/components/article-snippet-better-api/article-snippet-better-api.module';
import { UserSnippetModule } from 'src/app/components/user-snippet/user-snippet.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    PipeModule,
    ArticleSnippetBetterApiModule,
    UserSnippetModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {}
