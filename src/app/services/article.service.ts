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

  private articleUrlBetterAPI = {
    upperPart: "https://hn.algolia.com/api/v1/search_by_date?tags=",
    hitsPerPage: "&hitsPerPage=150"
  }

  constructor(private http: HttpClient) { }

  getArticle(articleID: number): Observable<Article> {
    return this.http.get<Article>(`${this.articleURL.upperPart}${articleID}${this.articleURL.lowerPart}`)
  }

  getArticlesWithBetterAPI(selectedPage: string): Observable<any> {
    return this.http.get<any>(`${this.articleUrlBetterAPI.upperPart}${selectedPage}${this.articleUrlBetterAPI.hitsPerPage}`)
  }

}
