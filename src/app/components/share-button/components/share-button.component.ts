import { Component, OnInit ,Input} from '@angular/core';
import { Share } from '@capacitor/share';
import { Article } from 'src/app/models/article.models';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss'],
})
export class ShareButtonComponent  implements OnInit {
  @Input() article!:Article
  @Input() slot:string="end"
  @Input() size:string="small"
  constructor() { }

  ngOnInit() {}

  async onShare(){
    const articleUrl =  `https://news.ycombinator.com/item?id=${this.article.id}`
    await Share.share({
      title:this.article.title,
      url:articleUrl
    })
  }
}
