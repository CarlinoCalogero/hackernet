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
    this.route.queryParams.subscribe((value)=>{
      if(value["id"]){
        this.userService.getUser1(value["id"]).subscribe((user)=>{
          this.user = user
          this.loaded = true
          console.log("Loaded and found",this.user)
        })
      }
    })
  }
  toArticles(){
    console.log("To Articles")
    //this.navController.navigateForward("/articles")
  }
  toComments(){
    console.log("to User Comments")
    this.navController.navigateForward(`/comments?by=${this.user?.id}`)
  }
  isUserReady(){
    if(!this.user)
      return false
    return this.loaded
  }
}
