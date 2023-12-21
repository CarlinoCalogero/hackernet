import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  protected user:User|undefined
  protected loaded:boolean=false

  constructor(private userService:UserService, private route:ActivatedRoute, private navController:NavController) {}

  ngOnInit() {
    const userID = this.route.snapshot.params['username']
    this.userService.getUser(userID).subscribe((user)=>{
      this.user = user
      this.loaded = true
      console.log("Loaded and found",this.user)
    })
  }
  toArticles(){
    console.log("to User Suggested Articles")
    this.navController.navigateForward(`/suggested/${this.user?.id}`)
  }
  toComments(){
    console.log("to User Comments")
    this.navController.navigateForward(`/comments/${this.user?.id}`)
  }
  isUserReady(){
    if(!this.user)
      return false
    return this.loaded
  }
}
