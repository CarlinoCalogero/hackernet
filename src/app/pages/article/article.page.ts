import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.models';
import { NestedComment } from 'src/app/models/nestedComment.models';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  protected article!: Article
  protected elapsedTime!: string
  protected isFavourite: boolean | null = null

  constructor(
    private database: DatabaseService,
    private articleService: ArticleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadArticle().then(() => { console.log(this.isFavourite) })
  }

  async loadArticle() {
    const articleID = this.route.snapshot.params["articleID"]
    if (!articleID)
      return
    this.articleService.getArticle(articleID).subscribe(
      (res) => {
        this.article = res
        this.elapsedTime = this.computeTime();
        this.checkIfArticleIsAFavouriteArticle().then((result) => {
          this.isFavourite = result
        })
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

  private computeTime() {
    const todaysTime: number = new Date().getTime() / 1000
    let secondsDifference: number = todaysTime - this.article.time

    const secondsInAYear = 365 * 24 * 60 * 60
    let years = Math.floor(secondsDifference / secondsInAYear)
    secondsDifference -= years * secondsInAYear

    const secondsInAMonth = 30 * 24 * 60 * 60
    let months = Math.floor(secondsDifference / secondsInAMonth)
    secondsDifference -= months * secondsInAMonth

    const secondsInADay = 24 * 60 * 60
    let days = Math.floor(secondsDifference / secondsInADay)
    secondsDifference -= days * secondsInADay

    const secondsInAnHour = 60 * 60
    let hours = Math.floor(secondsDifference / secondsInAnHour)
    secondsDifference -= hours * secondsInAnHour

    const secondsInAMinute = 60
    let minutes = Math.floor(secondsDifference / secondsInAMinute)
    secondsDifference -= minutes * secondsInAMinute

    return `${years != 0 ? ` ${years} years` :
      `${months != 0 ? ` ${months} months` :
        `${days != 0 ? `${days} days` :
          `${hours != 0 ? ` ${hours} hours` :
            `${minutes != 0 ? ` ${minutes} minutes ` :
              `${secondsDifference} seconds`}`}`}`}`} ago`
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
}
