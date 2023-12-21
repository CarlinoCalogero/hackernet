import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage:DatabaseService, 
    private navController:NavController,
    private location:Location,
    private platform:Platform,
    private alertController:AlertController
    ) {
    this.initApp()
  }

  async initApp(){
    await this.storage.init()
    SplashScreen.hide()
    this.platform.ready().then(()=>{
      this.platform.backButton.subscribeWithPriority(10,()=>{
        const url = this.location.path()
        if(url === "/home")
          this.showCloseAppDialog()
        else
          this.navController.back()
      })
    })
  }

  private showCloseAppDialog(){
    this.alertController.create({
      header: "Closing Hackernet",
      message:"Do you wanto to close the app",
      buttons:[{
        text:"Yes",
        role:"confirm",
        handler: ()=>{
          App.exitApp()
        }}
        ,
        {
          text:"No",
          role:"cancel"
        }
      ]}).then(alert=>{
        alert.present()
      })
  }
}
