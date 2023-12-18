import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Article } from 'src/app/models/article.models';
import { ArticleService } from 'src/app/services/article.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-suggested',
  templateUrl: './suggested.page.html',
  styleUrls: ['./suggested.page.scss'],
})
export class SuggestedPage implements OnInit {

  protected userSuggestedArticles: Article[] = []
  protected userSuggestions!: number[]
  protected checkedSuggestions: number = 0
  protected isAreSuggestedArticlesLoaded = false

  protected showedSuggestedArticles: Article[] = []
  protected numberOfLoadedSuggestedArticles: number = 10

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const username = this.route.snapshot.params["username"]
    this.userService.getUser(username).subscribe((user) => {
      console.log(user)
      this.userSuggestions = user?.submitted!
      this.loadUserSuggestedArticles()
    })
  }

  async loadUserSuggestedArticles() {
    console.log(this.userSuggestions)
    for (let i = 0; i < this.userSuggestions.length; i++) {
      this.articleService.getArticle(this.userSuggestions[i]).subscribe(
        (res) => {
          if (res.type != "comment") {
            this.userSuggestedArticles.push(res)
          }
          this.checkIfSuggestedArticlesAreLoaded()
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }

  private checkIfSuggestedArticlesAreLoaded() {
    this.checkedSuggestions = this.checkedSuggestions + 1;
    if (this.checkedSuggestions == this.userSuggestions.length) {
      this.isAreSuggestedArticlesLoaded = true
      this.generateItems()
    }
  }

  private generateItems() {
    let index = this.showedSuggestedArticles.length
    const nextIndex = Math.min(this.showedSuggestedArticles.length + this.numberOfLoadedSuggestedArticles, this.userSuggestedArticles.length);
    for (; index < nextIndex; index++) {
      this.showedSuggestedArticles.push(this.userSuggestedArticles[index])
    }
  }

  onIonInfinite(infiniteScrollCustomEvent: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      infiniteScrollCustomEvent.target.complete();
    }, 500);
  }

}
