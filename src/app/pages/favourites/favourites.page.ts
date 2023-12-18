import { Component, OnInit } from '@angular/core';
import { DatabaseService} from 'src/app/services/database.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})

export class FavouritesPage implements OnInit {
  protected favourites:number[]=[]
  private i:number=1
  private j:number=2
  constructor(private database:DatabaseService) { 

  }

  ngOnInit() {
    this.loadFavs()
  }

  async loadFavs(){
    this.favourites = await this.database.getFavourites()
  }
  async addFav(){
    this.favourites.push(this.i++)
    await this.database.setFavourites(this.favourites)
    await this.loadFavs()
  }

  async delFav(index:number){
    this.favourites.splice(index,1)
    await this.database.setFavourites(this.favourites)
    await this.loadFavs()
  }
}
