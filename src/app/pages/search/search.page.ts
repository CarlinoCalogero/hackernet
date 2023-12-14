import { Component, OnInit } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  searchTerm: string = '';
  currentFilter: string[] = [];
  articles: any[] = [];
  comments: any[] = [];
  resultsArticles: any[] = [];
  resultsComments: any[] = [];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.searchService.searchArticles().subscribe((data:any) => {
      this.articles = data.hits;
    });

    this.searchService.searchComments().subscribe((data:any) => {
      this.comments = data.hits;
    });
  }

  search(event:any){
    this.searchTerm = event.target.value;

    if(this.searchTerm !== '' && this.currentFilter.includes('articles')) {
      this.resultsArticles = this.articles.filter((article:any) => {
        return article.title.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }

    if(this.searchTerm !== '' && this.currentFilter.includes('comments')) {
      this.resultsComments = this.comments.filter((comment:any) => {
        return comment.comment_text.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
      });
    }

    if(this.searchTerm === '' && this.currentFilter.includes('articles')){
      this.resultsArticles = this.articles;
    }

    if(this.searchTerm === '' && this.currentFilter.includes('comments')){
      this.resultsComments = this.comments;
    }

  }

  handleSelection(event:any){
    this.currentFilter = event.target.value;
  }

}
