import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsPageRoutingModule } from './comments-routing.module';

import { CommentsPage } from './comments.page';
import { CommentModule } from 'src/app/modules/comment/comment.module';
import { HtmlToTextPipe } from 'src/app/pipes/html-to-text.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsPageRoutingModule,
    CommentModule
  ],
  declarations: [CommentsPage]
})
export class CommentsPageModule {}
