import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './components/comment/comment.component';
import { IonicModule } from '@ionic/angular';
import { NestedCommentComponent } from './components/nested-comment/nested-comment.component';

@NgModule({
  declarations: [CommentComponent, NestedCommentComponent],
  exports: [CommentComponent, NestedCommentComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class CommentModule { }
