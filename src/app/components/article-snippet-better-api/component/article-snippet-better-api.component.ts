import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-article-snippet-better-api',
  templateUrl: './article-snippet-better-api.component.html',
  styleUrls: ['./article-snippet-better-api.component.scss'],
})
export class ArticleSnippetBetterApiComponent  implements OnInit {

  @Input() article !: any

  constructor(private navController: NavController) { }

  ngOnInit() {
    console.log(this.article)
  }

  onClick(){
    this.navController.navigateForward(`/article/${this.article.objectID}`)
  }

}
