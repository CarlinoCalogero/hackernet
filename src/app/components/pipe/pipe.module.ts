import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlToTextPipe } from 'src/app/pipes/html-to-text.pipe';



@NgModule({
  declarations: [HtmlToTextPipe],
  imports: [
    CommonModule
  ],
  exports: [HtmlToTextPipe]
})
export class PipeModule { }
