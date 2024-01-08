import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Article } from 'src/app/models/article.models';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-snippet',
  templateUrl: './article-snippet.component.html',
  styleUrls: ['./article-snippet.component.scss'],
})
export class ArticleSnippetComponent implements OnInit {

  @Input() article !: Article
  @Input() showHeartIcon: boolean = false
  protected isWasHeartClicked: boolean = false

  @Input() parentApi !: any;

  constructor(private navController: NavController) { }

  ngOnInit() {
  }

  onClick() {
    this.navController.navigateForward(`/article/${this.article.id}`)
  }

  onHeartClick(event: Event) {
    event.stopPropagation()
    this.parentApi.callParentMethod(this.article.id).then((value: boolean) => {
      this.isWasHeartClicked = value
    })
  }

  onLinkClick(event:Event){
    event.stopPropagation()
  }
  
}
