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

  async setUser(username:string):Promise<User|undefined> {
    if (this.user) {
      if(this.user.id ===username)
        return this.user
    }
    const subscription = this.httpClient.get(this.url+username+'.json').pipe(take(1))
    const isFound = await firstValueFrom(subscription) as User
    console.log(isFound)
    if(isFound) {
      this.user = isFound
      return this.user
    }
    return undefined
  }

  getUser():User|undefined {
    return this.user?{...this.user}:undefined
  }
  getUser1(username:string):Observable<User|undefined>{
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
