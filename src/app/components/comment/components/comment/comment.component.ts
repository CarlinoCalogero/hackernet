import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Article } from 'src/app/models/article.models';
import { Comment } from 'src/app/models/comment.models';
import { NestedComment } from 'src/app/models/nestedComment.models';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {

  @Input() article !: Article
  @Input() userComments !: Comment[]

  protected comments: NestedComment[] = []
  protected showedComments: NestedComment[] = []
  protected numberOfLoadedComments!: number

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.setUpComments()
  }

  async setUpComments() {
    if (this.article != null && this.userComments != null) {
      console.error("Error, both article and userComments are not null")
    }
    if (this.article != null) {
      await this.getArticleComments()
      this.numberOfLoadedComments = 5;
    }
    if (this.userComments != null) {
      await this.getUserCommentsTree()
      this.numberOfLoadedComments = 10;
    }
    this.generateItems()
  }

  async getArticleComments() {
    if(!this.article.kids)
      return
    for (let i = 0; i < this.article.kids.length; i++) {
      let articleComment: NestedComment = {
        parent: {} as Comment,
        kids: []
      }
      this.comments.push(articleComment)
      this.addChildrenComments(articleComment, this.article.kids[i])
    }
  }

  async getUserCommentsTree() {
    for (let i = 0; i < this.userComments.length; i++) {
      let currentUserComment = this.userComments[i]
      if (this.checkIfCommentIsAlive(currentUserComment)) {
        let userComment: NestedComment = {
          parent: currentUserComment,
          kids: []
        }
        this.comments.push(userComment)
        if ("kids" in currentUserComment) {
          for (let j = 0; j < currentUserComment.kids.length; j++) {
            let userCommentKidComment: NestedComment = {
              parent: {} as Comment,
              kids: []
            }
            userComment.kids.push(userCommentKidComment)
            this.addChildrenComments(userCommentKidComment, currentUserComment.kids[j])
          }
        }
      }
    }
  }

  async addChildrenComments(kid: NestedComment, kidID: number) {
    this.commentService.getComment(kidID).subscribe(
      (res) => {
        if (res != null && res != undefined && this.checkIfCommentIsAlive(res)) {
          kid.parent = res
          if ('kids' in res) {
            for (let i = 0; i < res.kids.length; i++) {
              let kidNestedComment: NestedComment = {
                parent: {} as Comment,
                kids: []
              }
              kid.kids.push(kidNestedComment)
              this.addChildrenComments(kidNestedComment, res.kids[i])
            }
          }
        }
      },
      (err) => {
        console.error(err)
      }
    )
  }

  private generateItems() {
    let index = this.showedComments.length
    const nextIndex = Math.min(this.showedComments.length + this.numberOfLoadedComments, this.comments.length);
    for (; index < nextIndex; index++) {
      this.showedComments.push(this.comments[index])
    }
  }

  onIonInfinite(infiniteScrollCustomEvent: InfiniteScrollCustomEvent) {
    this.generateItems();
    setTimeout(() => {
      infiniteScrollCustomEvent.target.complete();
    }, 500);
  }

  /**
   * 
   * @param comment 
   * @returns true if comment is alive, false if comment is dead
   */
  private checkIfCommentIsAlive(comment: Comment) {
    if (!("deleted" in comment))
      return true
    if (comment.deleted)
      return false
    return true
  }

}
