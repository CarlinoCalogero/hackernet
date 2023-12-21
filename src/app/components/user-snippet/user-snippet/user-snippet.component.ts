import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-snippet',
  templateUrl: './user-snippet.component.html',
  styleUrls: ['./user-snippet.component.scss'],
})
export class UserSnippetComponent  implements OnInit {

  @Input() user !: User

  constructor(private navController: NavController) { }

  ngOnInit() {}

  onClick(){
    this.navController.navigateForward(`/profile/${this.user.id}`)
  }
}
