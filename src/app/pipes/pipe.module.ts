import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlToTextPipe } from 'src/app/pipes/html-to-text/html-to-text.pipe';
import { DateToStringPipe } from './date-to-string/date-to-string.pipe';



@NgModule({
  declarations: [HtmlToTextPipe, DateToStringPipe],
  imports: [
    CommonModule
  ],
  exports: [HtmlToTextPipe, DateToStringPipe]
})
export class PipeModule { }
