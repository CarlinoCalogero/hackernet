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

  constructor(httpClient: HttpClient, userService: UserService) {
    this.httpClient = httpClient;
    this.userService = userService;
  }

  searchArticles(query: string, tags: string[]): Observable<any>{
    let url = this.buildArticleURL(query, tags);
    return this.httpClient.get(url);
  }

  searchUsers(query: string): Observable<User | undefined> {
    return this.userService.getUser1(query);
  }

  private buildArticleURL(query: string, tags: string[]): string {
    let url = this.articlesURL.upperPart;

    if(tags.length > 0){
      if (tags.includes(this.articlesURL.tags.author)) {
        url += this.articlesURL.lowerPart + this.articlesURL.tags.author + query;
        tags.forEach(tag => {
          if (tag !== this.articlesURL.tags.author) {
            url += ',' + tag;
          }
        });
      } else {
        url += query + this.articlesURL.lowerPart + tags.join(',');
      }
    }

    return url;
  }

}
