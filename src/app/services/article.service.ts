import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article.models';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private articleURL = {
    upperPart: "https://hacker-news.firebaseio.com/v0/item/",
    lowerPart: ".json?print=pretty"
  }

  constructor(private http: HttpClient) { }

  getArticle(articleID: number): Observable<Article> {
    return this.http.get<Article>(`${this.articleURL.upperPart}${articleID}${this.articleURL.lowerPart}`)
  }
}
