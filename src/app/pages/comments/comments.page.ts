import { Component, OnInit } from '@angular/core';
import { Comment } from 'src/app/models/comment.models';
import { CommentService } from 'src/app/services/comment.service';

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
    private commentService: CommentService
  ) { }

  ngOnInit() {
    this.loadUserComments()
  }

  async loadUserComments() {
    this.userSubmitted = [34965733, 28836275, 28836263, 28426083, 25688687, 25688661, 25688626, 25426329, 22072713, 18144213, 17832839, 17832835, 17120465, 13846752, 10330390, 10330387, 10328571, 10328326, 10328309, 9734961, 8736450, 6349783, 6175422, 4896367, 3610274, 3278080, 2923189, 2921983, 2593513, 2593415, 2409691, 2408284, 2405466, 1803815, 58027]
    for (let i = 0; i < this.userSubmitted.length; i++) {
      this.commentService.getComment(this.userSubmitted[i]).subscribe(
        (res) => {
          if (res.type == "comment") {
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

}
