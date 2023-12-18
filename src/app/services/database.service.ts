import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';


enum KEYS {
  favourites = 'favourites',
  stats = 'stats'
}
// These two are subject to change most definitely...
interface Stats{
  daily:number
  monthly:number
  yearly:number
}
interface Favourites{
  ids:number[]
}
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {


  constructor(private storage:Storage) {
    this.storage.defineDriver(cordovaSQLiteDriver)
  }  
  async init(){
    await this.storage.create()
  }
  
  async getFavourites():Promise<number[]>{
    const favs = await this.storage.get(KEYS.favourites) || [] 
    return favs as number[]
  }
  
  async getStats():Promise<Stats>{
    const favs = await this.storage.get(KEYS.favourites) || {} 
    return favs as Stats
  }

  async setFavourites(favsIDs:number[]){
    const result = await this.storage.set(KEYS.favourites,favsIDs)
    return result
  }
  async setStats(newStats:Stats){
    const result = await this.storage.set(KEYS.stats,newStats)
    return result
  }
}
