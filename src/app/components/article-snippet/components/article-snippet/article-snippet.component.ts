import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Article } from 'src/app/models/article.models';

@Component({
  selector: 'app-article-snippet',
  templateUrl: './article-snippet.component.html',
  styleUrls: ['./article-snippet.component.scss'],
})
export class ArticleSnippetComponent implements OnInit {

  @Input() article !: Article

  constructor(private navController:NavController) { }

  ngOnInit() { }


  onClick(){
    this.navController.navigateForward(`/article/${this.article.id}`)
  }
}
