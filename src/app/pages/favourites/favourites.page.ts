import { Component, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/models/article.models';
import { ArticleService } from 'src/app/services/article.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  styleUrls: ['./favourites.page.scss'],
})

export class FavouritesPage implements OnInit {
  protected favourites: number[] = []
  protected userFavourites: Article[] = []
  protected hasLoaded:boolean=false

  constructor(private database: DatabaseService, private articleService: ArticleService) {

  }

  ngOnInit() {
    
  }

  ionViewWillEnter(){
    this.loadFavs()
  }
  ionViewWillLeave(){
    this.hasLoaded=false
    this.userFavourites = []
  }
  async loadFavs() {
    this.userFavourites = []
    this.favourites = await this.database.getFavourites()
    for (const favID of this.favourites) {
      this.articleService.getArticle(favID).subscribe((res) => {
        this.userFavourites.push(res)
      })
    }
    this.hasLoaded= this.checkLoadingStatus()
  }

  async delFav(articleID: number): Promise<boolean> {
    if (confirm("Do you really wish to remove the article from favourites?")) {
      this.favourites.splice(this.favourites.indexOf(articleID), 1)
      //this.removeFavourite(articleID)
      await this.database.setFavourites(this.favourites)
      await this.loadFavs()
      return true
    }
    return false
  }

  removeFavourite(articleID: number) {
    for (let i = 0; i < this.userFavourites.length; i++) {
      const currentFavourite = this.userFavourites[i];
      if (currentFavourite.id == articleID) {
        this.userFavourites.splice(i, 1)
        return
      }
    }
  }

  getParentMethod(): any {
    return {
      callParentMethod: async (index: number): Promise<boolean> => {
        return this.delFav(index)
      }
    }
  }

  private checkLoadingStatus(){
    return this.userFavourites.length === this.favourites.length
  }

}
