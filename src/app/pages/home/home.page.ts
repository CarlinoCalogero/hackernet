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

  loadPage(event: any){
    this.articles = [];
    this.showedArticles = [];
    this.currentFilter = event.target.value;
    this.getArticles();
  }

  private getArticles(){
    this.articleService.getArticlesWithBetterAPI(this.currentFilter).subscribe(
      (data: any) => {
        this.articles = data.hits;
        this.checkIfArticlesAreLoaded();
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

  onIonInfinite(infiniteScrollCustomEvent: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      infiniteScrollCustomEvent.target.complete();
    }, 500);
  }

}
