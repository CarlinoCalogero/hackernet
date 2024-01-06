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
  protected showedArticles: Article[] = [];
  protected areArticlesLoaded: boolean = false;
  private articleService: ArticleService;
  private currentFilter: string = "ask_hn";
  private numberOfArticlesShowed: number = 15;
  private currentRequestId: number = 0;



  constructor(articleService: ArticleService) {
    this.articleService = articleService;
  }


  ngOnInit() {
    this.getArticles();
  }

  private checkIfArticlesAreLoaded() {
    if (this.articles.length > 0) {
      this.areArticlesLoaded = true;
      this.generateItems();
    }
  }

  protected loadPage(event: any){
    this.articles = [];
    this.showedArticles = [];
    this.currentFilter = event.target.value;
    this.getArticles();
  }

  private getArticles(){
    this.currentRequestId++;
    const requestId = this.currentRequestId;

    this.articleService.getArticlesWithBetterAPI(this.currentFilter).subscribe(
      (data: any) => {
        if(requestId === this.currentRequestId) {
          this.articles = data.hits;
          this.checkIfArticlesAreLoaded();
        }
      }
    )
  }

  private generateItems() {
    let index = this.showedArticles.length;
    const nextIndex = Math.min(this.showedArticles.length + this.numberOfArticlesShowed, this.articles.length);
    for (; index < nextIndex; index++) {
      this.showedArticles.push(this.articles[index]);
    }
  }

  protected onIonInfinite(infiniteScrollCustomEvent: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      infiniteScrollCustomEvent.target.complete();
    }, 500);
  }

}
