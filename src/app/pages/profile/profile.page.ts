import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { DatabaseService } from 'src/app/services/database.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  protected user:User|undefined
  protected loaded:boolean=false
  private timeoutID:any

  constructor(
    private userService:UserService, 
    private route:ActivatedRoute, private navController:NavController,
    private database:DatabaseService
    ) {}

  ngOnInit() {
    const userID = this.route.snapshot.params['username']
    this.userService.getUser(userID).subscribe((user)=>{
      this.user = user
      this.loaded = true
    })
  }

  ionViewDidEnter(){
    this.timeoutID = setTimeout(()=>{
      this.database.increaseAuthorStats(this.user!.id)
    },5000)
  }

  ionViewWillLeave(){
    clearTimeout(this.timeoutID)
  }

  toArticles(){
    this.navController.navigateForward(`/suggested/${this.user?.id}`)
  }

  toComments(){
    this.navController.navigateForward(`/comments/${this.user?.id}`)
  }

  isUserReady(){
    if(!this.user)
      return false
    return this.loaded
  }
  
}
