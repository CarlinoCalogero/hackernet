import { Component, Input, OnInit } from '@angular/core';
import { NestedComment } from 'src/app/models/nestedComment.models';

@Component({
  selector: 'app-nested-comment',
  templateUrl: './nested-comment.component.html',
  styleUrls: ['./nested-comment.component.scss'],
})
export class NestedCommentComponent implements OnInit {

  @Input() nestedComment !: NestedComment
  @Input() isParentComment !: boolean

  constructor() { }

  ngOnInit() {
  }

}
