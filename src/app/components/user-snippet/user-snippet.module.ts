import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { IonicModule } from '@ionic/angular';
import { UserSnippetComponent } from './user-snippet/user-snippet.component';


@NgModule({
  declarations: [UserSnippetComponent],
  exports: [UserSnippetComponent],
  imports: [
    CommonModule,
    IonicModule,
    PipeModule
  ]
})
export class UserSnippetModule { }
