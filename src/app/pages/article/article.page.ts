import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/models/article.models';
import { ArticleService } from 'src/app/services/article.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  protected article!: Article
  protected isFavourite: boolean | null = null

  private timoutID: any
  constructor(
    private database: DatabaseService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadArticle()
  }
  ionViewDidLeave() {
    clearTimeout(this.timoutID)
  }
  async loadArticle() {
    const articleID = this.route.snapshot.params["articleID"]
    if (!articleID)
      return
    this.articleService.getArticle(articleID).subscribe(
      (res) => {
        this.article = res
        console.log(res)
        this.checkIfArticleIsAFavouriteArticle().then((result) => {
          this.isFavourite = result
        })
        this.timoutID = setTimeout(async () => {
          await this.database.increaseWatchedArticles()
          this.updateCategoryStats()
        }, 5000)
      },
      (err) => {
        console.error(err)
      }
    )
  }

  async checkIfArticleIsAFavouriteArticle() {
    const favourites = await this.database.getFavourites()
    return favourites.indexOf(this.article.id) != -1
  }

  async onHeartClick(event: Event) {
    event.stopPropagation()
    console.log(this.isFavourite)
    if (this.isFavourite) {
      this.database.removeFavourite(this.article.id)
      console.log("remove")
    } else {
      this.database.addFavourite(this.article.id)
      console.log("add")
    }
    this.isFavourite = !this.isFavourite
    console.log(this.isFavourite)
  }
  getProfileUrl() {
    return `/profile/${this.article.by}`
  }
  updateCategoryStats() {
    const title = this.article.title.toLocaleLowerCase()
    if (title.startsWith("ask hn"))
      this.database.increaseCategoryStats("ask")
    else if (title.startsWith("show hn"))
      this.database.increaseCategoryStats("show")
    else
      this.database.increaseCategoryStats(this.article.type)
  }
}
