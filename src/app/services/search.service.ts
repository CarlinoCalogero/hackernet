import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private httpClient: HttpClient;
  private url = {
    upperPart: 'https://hn.algolia.com/api/v1/search?query=',
    lowerPart: '&tags=',
    storyFilter: 'story',
    commentFilter: 'comment'
  } 

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  searchArticles(): Observable<any> {
    const url = this.url.upperPart + this.url.lowerPart + this.url.storyFilter;
    return this.httpClient.get(url);
  }

  searchComments(): Observable<any> {
    const url = this.url.upperPart  + this.url.lowerPart + this.url.commentFilter;
    return this.httpClient.get(url);
  }


}
