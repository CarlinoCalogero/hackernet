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
    lowerPart: '&tags=story'
  };

  constructor(httpClient: HttpClient, userService: UserService) {
    this.httpClient = httpClient;
    this.userService = userService;
  }

  searchArticles(query: string): Observable<any>{
    const url = this.articlesURL.upperPart + query + this.articlesURL.lowerPart;
    return this.httpClient.get(url);
  }

  searchUsers(query: string): Observable<User | undefined> {
    return this.userService.getUser1(query);
  }

}
