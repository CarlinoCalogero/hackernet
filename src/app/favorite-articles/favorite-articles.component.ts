import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-favorite-articles',
  templateUrl: './favorite-articles.component.html',
  styleUrls: ['./favorite-articles.component.scss']
})
export class FavoriteArticlesComponent implements OnInit {
  favoriteArticles: any[] = [];
  isFavoritesEmpty: boolean = true;

  constructor(private articleService: ArticleService) {}

  ngOnInit() {
    this.loadFavoriteArticles();
  }

  loadFavoriteArticles(): void {
    this.favoriteArticles = this.articleService.getFavoriteArticles();
    this.isFavoritesEmpty = this.favoriteArticles.length === 0;
  }

  removeFromFavorites(article: any): void {
    this.articleService.removeFavoriteArticle(article);
    this.loadFavoriteArticles();
  }

  addToFavorites(article: any): void {
    this.articleService.addFavoriteArticle(article);
    this.loadFavoriteArticles();
  }
}
