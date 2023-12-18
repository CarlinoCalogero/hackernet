import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage:DatabaseService) {
    this.initApp()
  }

  async initApp(){
    console.log("Starting Up")
    await this.storage.init()
    SplashScreen.hide()
    console.log("Started")
  }
}
