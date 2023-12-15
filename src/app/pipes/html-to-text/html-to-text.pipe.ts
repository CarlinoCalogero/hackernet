import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlToText'
})
export class HtmlToTextPipe implements PipeTransform {

  transform(htmlText:string): string{
    const div = document.createElement("div")
    div.innerHTML = htmlText
    return div.innerText
  }

}
