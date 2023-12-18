import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subscriber, Subscription, firstValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private httpClient:HttpClient
  private user:User|undefined
  private url = 'https://hacker-news.firebaseio.com/v0/user/'

  constructor(httpClient:HttpClient) {
    this.httpClient = httpClient
  }

  getUser(username:string):Observable<User|undefined>{
    if(this.user) {
      if(this.user.id ===username)
        return new Observable((sub)=>{
          sub.next(this.user)
          sub.complete()
        })
    }
    const subscription = this.httpClient.get<User|undefined>(this.url+username+'.json').pipe(take(1))
    return subscription
  }
}
