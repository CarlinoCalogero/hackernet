import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  protected user:User|undefined

  constructor(private userService:UserService) {
    this.user = this.userService.getUser()!
  }

  ngOnInit() {
  }
  toSubmissions(){
    console.log("Navigate to Submissions Page")
  }
}
