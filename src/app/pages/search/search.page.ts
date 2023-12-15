import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/models/user';
import { SearchService } from 'src/app/services/search.service';
import { UserService } from 'src/app/services/user.service';


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
    this.query = ""; // i'll remove this later, i'll handle it to make the user change the filter and update the query
    this.reset();
  }

  async search(event:any){
    this.query = event.target.value;

    if (this.query !== "" && this.currentFilter.includes("articles")) {
      (await this.searchService.searchArticles(this.query)).subscribe((data:any) => {
        console.log(data.hits);
        this.articles = data.hits;
      });
    }

    if (this.query !== "" && this.currentFilter.includes("users")) {
      this.searchService.searchUsers(this.query).subscribe((user:User|undefined) => {
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
