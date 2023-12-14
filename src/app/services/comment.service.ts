import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentURL = {
    upperPart: "https://hacker-news.firebaseio.com/v0/item/",
    lowerPart: ".json?print=pretty"
  }

  constructor(private http: HttpClient) { }

  getComment(commentID: number): Observable<Comment>{
    return this.http.get<Comment>(`${this.commentURL.upperPart}${commentID}${this.commentURL.lowerPart}`)
  }

}
