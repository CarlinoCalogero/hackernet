import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Location } from '@angular/common';
import { NavController, Platform } from '@ionic/angular/common';
import { AlertController } from '@ionic/angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage:DatabaseService, 
    private platform:Platform,
    private location:Location,
    private alertController:AlertController,
    private navController:NavController
    ) {
    this.initApp()
  }

  async initApp(){
    console.log("Starting Up")
    await this.storage.init()
    this.setUpBackwardNav()
    SplashScreen.hide()
    console.log("Started")
  }

  private setUpBackwardNav(){
    this.platform.ready().then(()=>{
      this.platform.backButton.subscribeWithPriority(10,()=>{
        const url = this.location.path()
        if(url == "/home")
          this.showExitDialog()
        else
          this.navController.back()
      })
    })
  }
  private showExitDialog(){
    this.alertController.create({
      header:"Do you want to exit Hakernet?",
      buttons:[{
        text:"Yes",
        role:"confirm",
        handler: ()=>{App.exitApp()}
      },{
        text:"No",
        role:"cancel"
      }]
    }).then((alert)=>{
      alert.present()
    })
  }
}
