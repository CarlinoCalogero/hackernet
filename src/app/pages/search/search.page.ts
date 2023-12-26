import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { SearchService } from 'src/app/services/search.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  protected query: string = '';
  private currentFilters: string[] = [];
  private currentArticleFilters: string[] = [];
  private currentTimeFilters: string[] = ["none"];
  protected defaultTimeFilter: string = "none";
  protected articles: any[] = [];
  protected user: User|undefined;
  protected isArticleSelected: boolean = false;
  private isMainTagSelected: boolean = false;
  protected currentPlaceholder: string = "Search Articles";

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.currentFilters = ["articles"];
    this.currentArticleFilters = ["story"];
    this.currentTimeFilters = ["none"];
    this.isArticleSelected = true;
  }
  
  protected handleSelection(event:any){
    this.currentFilters = event.target.value;
    this.setCurrentPlaceholder();
    this.checkIfArticleSelected(event);
    this.reset();
    this.search(this.query);
  }

  protected handleArticleFilterSelection(event:any){
    this.currentArticleFilters = event.target.value;
    this.reset();
    this.search(this.query);
  }

  protected handleTimeFilterSelection(event:any){
    this.currentTimeFilters = event.target.value;
    this.reset();
    this.search(this.query);
  } 

  protected checkIfArticleSelected(event:any) {
    this.isArticleSelected = event.target.value.includes("articles");
    return this.isArticleSelected;
  }

  protected checkIfMainTagSelected() {
    this.isMainTagSelected = this.currentFilters.includes("articles") || this.currentFilters.includes("users");
    return this.isMainTagSelected;
  }

  private setCurrentPlaceholder() {
    switch (true) {
      case this.currentFilters.length === 0:
        this.currentPlaceholder = "Select a filter";
        break;
      case this.currentFilters.includes("articles") && this.currentFilters.includes("users"):
        this.currentPlaceholder = "Search Articles & Users";
        break;
      case this.currentFilters.includes("articles"):
        this.currentPlaceholder = "Search Articles";
        break;
      case this.currentFilters.includes("users"):
        this.currentPlaceholder = "Search Users";
        break;
    }
  }

  protected search(event?:any, query?:string){
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


  private reset() {
    this.articles = [];
    this.user = undefined;
  }

}
