import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { firstValueFrom, lastValueFrom, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url:string = "https://hacker-news.firebaseio.com/v0/user/"
  private user:User|undefined;
  private httpClient: HttpClient;

  constructor(httpClient:HttpClient) {
    this.httpClient = httpClient
  }

  async setUser(username:string):Promise<boolean>{
    if(this.user){
      if(this.user.id === username)
        return true
    }
    const subscription = this.httpClient.get(this.url+username+".json").pipe(
      take(1)
    )
    const result = await firstValueFrom(subscription) as User
    if(result){
      this.user = {...result}
      return true
    }
    return false
  }

  getUser():User|undefined{
    return this.user? {...this.user} : undefined
  }
}
