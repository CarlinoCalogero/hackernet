import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Article } from 'src/app/models/article.models';
import { NestedComment } from 'src/app/models/nestedComment.models';
import { ArticleService } from 'src/app/services/article.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {

  protected article!: Article

  constructor(
    private articleService: ArticleService,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadArticle()
  }

  async loadArticle() {
    const articleID = this.route.snapshot.params["articleID"]
    if(!articleID)
      return
    this.articleService.getArticle(articleID).subscribe(
      (res) => {
        this.article = res
      },
      (err) => {
        console.error(err)
      }
    )
  }

}
