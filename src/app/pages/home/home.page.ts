import { Component } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Article } from 'src/app/models/article.models';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected articles: Article[] = [];
  private articleService: ArticleService;
  private currentFilter: string = "ask_hn";


  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }

  ionViewWillEnter(){
    this.getArticles();
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.getArticles();
    setTimeout(() => {
      (event as InfiniteScrollCustomEvent).target.complete();
    }, 1000);
  }

  loadPage(event: any){
    this.articles = [];
    this.currentFilter = event.target.value;
    this.getArticles();
  }

  private getArticles(){
    this.articleService.getArticlesWithBetterAPI(this.currentFilter).subscribe(
      (data: any) => {
        this.articles = data.hits;
      }
    )
  }

}
