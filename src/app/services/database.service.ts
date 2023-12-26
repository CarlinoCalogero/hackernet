import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

enum KEYS {
  favourites = 'favourites',
  stats = 'stats'
}
// These are subject to change most definitely...
export interface Stats {
  daily: number[]
  monthly: number[]
  yearly: number[]
  author:[string,number]
  category:[string,number]
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private currentDate:Date = new Date(Date.now())
  private runtimeAuthorAndCategoryStats:Map<string,number> = new Map<string,number>()


  constructor(private storage: Storage) {
    this.storage.defineDriver(cordovaSQLiteDriver)
  }
  async init() {
    await this.storage.create()
    let modified:boolean = false
    let savedStats:Stats = await this.getStats()
    if(!savedStats){
      modified = true
      savedStats = {
        daily: [this.currentDate.getDate(),0],
        monthly: [this.currentDate.getMonth(),0],
        yearly:  [this.currentDate.getFullYear(),0],
        author: ["",0],
        category:["",0]
      }
    }
    if(savedStats.daily[0] != this.currentDate.getDate()){
      savedStats.daily[1] = 0
      modified = true
    }
    if(savedStats.monthly[0] != this.currentDate.getMonth()){
      savedStats.monthly[1] = 0
      modified = true
    }
    if(savedStats.yearly[0] != this.currentDate.getFullYear()){
      savedStats.yearly[1] = 0
      modified = true
    }
    this.runtimeAuthorAndCategoryStats.set(savedStats.author[0],savedStats.author[1])
    this.runtimeAuthorAndCategoryStats.set(savedStats.category[0],savedStats.category[1])
    if(modified){
      await this.setStats(savedStats)
    }
  }

  async getFavourites(): Promise<number[]> {
    const favs = await this.storage.get(KEYS.favourites) || []
    return favs as number[]
  }

  async getStats(): Promise<Stats> {
    const favs = await this.storage.get(KEYS.stats) || undefined
    return favs as Stats
  }

  async setFavourites(favsIDs: number[]) {
    const result = await this.storage.set(KEYS.favourites, favsIDs)
    return result
  }

  async setStats(newStats: Stats) {
    const result = await this.storage.set(KEYS.stats, newStats)
    return result
  }

  async addFavourite(articleID: number) {
    const favourites = await this.getFavourites();
    favourites.push(articleID);
    return await this.setFavourites([...favourites])
  }

  async removeFavourite(articleID: number) {
    let favourites = await this.getFavourites();
    favourites.splice(favourites.indexOf(articleID), 1)
    return await this.setFavourites([...favourites])
  }

  async increaseAuthorStats(key:string){
    let modified=false
    const savedStats = await this.getStats()
    let count = this.runtimeAuthorAndCategoryStats.get(key) || 0
    if(savedStats.author[1] <= count+1){
      savedStats.author[0] = key
      savedStats.author[1] = count+1
      modified = true
    }
    this.runtimeAuthorAndCategoryStats.set(key,count+1)
    if(modified){
      await this.setStats(savedStats)
    }
  }
  async increaseCategoryStats(key:string){
    let modified=false
    const savedStats = await this.getStats()
    let count = this.runtimeAuthorAndCategoryStats.get(key) || 0
    if(savedStats.category[1] <= count+1){
      savedStats.category[0] = key
      savedStats.category[1] = count+1
      modified = true
    }
    this.runtimeAuthorAndCategoryStats.set(key,count+1)
    if(modified){
      await this.setStats(savedStats)
    }
  }
  async increaseWatchedArticles(){
    const savedStats = await this.getStats()
    savedStats.daily[1]++
    savedStats.monthly[1]++
    savedStats.yearly[1]++
    await this.setStats(savedStats)
  }
}
