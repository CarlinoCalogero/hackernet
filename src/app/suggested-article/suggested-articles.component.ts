import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'ArticleService'

@Component({
  
  selector: 'app-suggested-articles',
  templateUrl: './suggested-articles.component.html',
  styleUrls: ['./suggested-articles.component.scss'],
})
export class SuggestedArticlesComponent implements OnInit {
  suggestedArticles: any[] = [];

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.suggestedArticles = this.articleService.getSuggestedArticles();
  }
}
