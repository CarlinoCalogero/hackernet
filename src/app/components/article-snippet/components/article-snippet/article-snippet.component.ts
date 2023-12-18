import { Component, Input, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { Article } from 'src/app/models/article.models';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-article-snippet',
  templateUrl: './article-snippet.component.html',
  styleUrls: ['./article-snippet.component.scss'],
})
export class ArticleSnippetComponent implements OnInit {

  @Input() article !: Article

  constructor() { }

  ngOnInit() { }



}
