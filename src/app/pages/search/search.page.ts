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
  currentFilter: string[] = [];
  articles: any[] = [];
  user: User|undefined;

  constructor(private searchService: SearchService) { }

  ngOnInit() {
  }
  
  handleSelection(event:any){
    this.currentFilter = event.target.value;
    this.reset();
    this.search(this.query);
  }

  search(event?:any, query?:string){
    if (event.target !== undefined) {
      this.query = event.target.value;
    } else if (query !== undefined) {
      this.query = query;
    }

    if (this.query !== "" && this.currentFilter.includes("articles")) {
      this.searchService.searchArticles(this.query).subscribe((data:any) => {
        this.articles = data.hits;
      });
    }

    if (this.query !== "" && this.currentFilter.includes("users")) {
      this.searchService.searchUsers(this.query).subscribe((user:User | undefined) => {
        this.user = user;
      });
    }

    if (this.query === "") {
      this.reset();
    }

  }

  reset() {
    this.articles = [];
    this.user = undefined;
  }

}
