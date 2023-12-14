import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private userSevice:UserService,private navController:NavController) {}

  async navToProfile(){
    const user= await this.userSevice.setUser("ciao")
    if(user)
      this.navController.navigateForward("/profile/"+user.id)
  }

}
