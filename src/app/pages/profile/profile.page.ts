import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  protected user:User
  private userService:UserService
  constructor(userService:UserService) {
    this.userService = userService
    this.user = this.userService.getUser()!
  }

  ngOnInit() {
  }
  getUserSubmissions(){
    if(this.user.submitted){
      return JSON.stringify(this.user.submitted)
    }
    return "No submissions were posted."
  }
}
