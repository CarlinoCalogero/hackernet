import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.models';
import { CommentService } from 'src/app/services/comment.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {

  protected userComments: Comment[] = []
  protected userSubmitted!: number[]
  protected checkedSubmissions: number = 0
  protected isAreCommentLoaded = false

  constructor(
    private commentService: CommentService, private userService: UserService, private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const username = this.route.snapshot.params["username"]
    this.userService.getUser(username).subscribe((user) => {
      this.userSubmitted = user?.submitted!
      if(this.userSubmitted == undefined)
        this.isAreCommentLoaded = true
      else
        this.loadUserComments()
    })
  }

  async loadUserComments() {
    for (let i = 0; i < this.userSubmitted.length; i++) {
      this.commentService.getComment(this.userSubmitted[i]).subscribe(
        (res) => {
          if (res.type == "comment" && this.checkIfCommentIsAlive(res)) {
            this.userComments.push(res)
          }
          this.checkIfCommentsAreLoaded()
        },
        (err) => {
          console.error(err)
        }
      )
    }
  }

  private checkIfCommentsAreLoaded() {
    this.checkedSubmissions = this.checkedSubmissions + 1;
    if (this.checkedSubmissions == this.userSubmitted.length) {
      this.isAreCommentLoaded = true
    }
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
