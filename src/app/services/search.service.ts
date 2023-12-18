import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private httpClient: HttpClient;
  private userService: UserService;
  private url: string = "";
  private articlesURL = {
    upperPart: 'https://hn.algolia.com/api/v1/search?query=',
    lowerPart: '&tags=',
    tags: {
      story: 'story',
      poll: 'poll',
      show_hn: 'show_hn',
      ask_hn: 'ask_hn',
      author: 'author_'
    }
  };

  private articlesByTimeURL = {
    upperPart: 'https://hn.algolia.com/api/v1/search_by_date?query=',
    lowerPart: '&numericFilters=created_at_i%3E'
  };

  private timestamps = {
    lastHour: 3600000,
    lastDay: 86400000,
    lastWeek: 604800000,
    lastMonth: 2592000000
  };


  constructor(httpClient: HttpClient, userService: UserService) {
    this.httpClient = httpClient;
    this.userService = userService;
  }


  searchArticles(query: string, articleTags: string[], timeFilters: string[]): Observable<any>{
    let url = this.buildArticleURL(query, articleTags, timeFilters);
    return this.httpClient.get(url);
  }

  private buildArticleURL(query: string, articleTags: string[], timeFilters: string[]): string {
    if(timeFilters.length > 0){
      if(this.buildArticleTimeSubstring(query, articleTags, timeFilters) === false) {
        this.url = this.articlesByTimeURL.upperPart + query + this.articlesByTimeURL.upperPart + this.generateTimestamp(timeFilters);
        return this.url;
      } else {
        return this.url;
      }
    } else if (timeFilters.length < 0) {
        if (this.buildArticleSubstring(query, articleTags) === false) {
          this.url = this.articlesURL.upperPart + query;
          return this.url;
        }
    }
    return this.url;
}

  private buildArticleTimeSubstring(query:string, articleTags: string[], timeFilters: string[]): boolean{
    if (articleTags.length > 0) {
      if (articleTags.includes(this.articlesURL.tags.author)) {
        this.url =  this.articlesByTimeURL.upperPart + this.articlesByTimeURL.lowerPart + this.generateTimestamp(timeFilters) + this.articlesURL.lowerPart + this.articlesURL.tags.author + query;
        articleTags.forEach(tag => {
          if (tag !== this.articlesURL.tags.author) {
            this.url += ',' + tag;
          }
        })
        return true
      } else if (!articleTags.includes(this.articlesURL.tags.author)) {
          this.url = this.articlesByTimeURL.upperPart + query + this.articlesByTimeURL.lowerPart + this.generateTimestamp(timeFilters) + this.articlesURL.lowerPart;
          articleTags.forEach(tag => {
            this.url += ',' + tag;
          });
          return true;
      }
    }
    return false;
  }

  private buildArticleSubstring(query:string, articleTags: string[]) {
    if (articleTags.length > 0) {
      if (articleTags.includes(this.articlesURL.tags.author)) {
        this.url =  this.articlesURL.upperPart + this.articlesURL.lowerPart + this.articlesURL.tags.author + query;
        articleTags.forEach(tag => {
          if (tag !== this.articlesURL.tags.author) {
            this.url += ',' + tag;
          }
        })
        return true
      } else if (!articleTags.includes(this.articlesURL.tags.author)) {
          this.url = this.articlesURL.upperPart + query + this.articlesURL.lowerPart;
          articleTags.forEach(tag => {
            this.url += ',' + tag;
          });
          return true;
      }
    }
    return false;
  }

  private generateTimestamp(timeFilters: string[]){
    if(timeFilters.includes("lastHour")){
      return (Date.now() - this.timestamps.lastHour).toString();
    }
    if(timeFilters.includes("lastDay")){
      console.log((Date.now() - this.timestamps.lastDay).toString())
      return (Date.now() - this.timestamps.lastDay).toString();
    }
    if(timeFilters.includes("lastWeek")){
      return (Date.now() - this.timestamps.lastWeek).toString();
    }
    if(timeFilters.includes("lastMonth")){
      return (Date.now() - this.timestamps.lastMonth).toString();
    }
    return "";
  }

  searchUsers(query: string): Observable<User | undefined> {
    return this.userService.getUser(query);
  }

}
