import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  query: string = '';
  currentFilters: string[] = [];
  currentArticleFilters: string[] = [];
  currentTimeFilters: string[] = [];
  articles: any[] = [];
  user: User|undefined;
  isArticleSelected: boolean = false;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }
  
  handleSelection(event:any){
    this.currentFilters = event.target.value;
    this.checkIfArticleSelected(event);
    this.reset();
    this.search(this.query);
  }

  handleArticleFilterSelection(event:any){
    this.currentArticleFilters = event.target.value;
    this.reset();
    this.search(this.query);
  }

  handleTimeFilterSelection(event:any){
    this.currentTimeFilters = event.target.value;
    this.reset();
    this.search(this.query);
  } 


  checkIfArticleSelected(event:any) {
    this.isArticleSelected = event.target.value.includes("articles");
    return this.isArticleSelected;
  }

  search(event?:any, query?:string){
    if (event.target !== undefined) {
      this.query = event.target.value;
    } else if (query !== undefined) {
      this.query = query;
    }

    this.searchArticles();
    this.searchUsers();

    if (this.query === "") {
      this.reset();
    }

  }

  private searchArticles(){
    if (this.query !== "" && this.currentFilters.includes("articles")) {
      this.searchService.searchArticles(this.query, this.currentArticleFilters, this.currentTimeFilters).subscribe((data:any) => {
        this.articles = data.hits;
        this.articles = this.articles.filter((article:any) => !article._tags.includes("comment"));
      });
    }
  }

  private searchUsers() {
    if (this.query !== "" && this.currentFilters.includes("users")) {
      this.searchService.searchUsers(this.query).subscribe((user:User | undefined) => {
        this.user = user;
      });
    }
  }


  reset() {
    this.articles = [];
    this.user = undefined;
  }

}
