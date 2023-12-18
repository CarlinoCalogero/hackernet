import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-personal-stats',
  templateUrl: './personal-stats.page.html',
  styleUrls: ['./personal-stats.page.scss'],
})
export class PersonalStatsPage implements OnInit {
  protected stats:any //cause i don't want to touch the service right now

  constructor(private database:DatabaseService) { }

  ngOnInit() {
    this.loadStats()
  }
  async loadStats(){
    await this.database.getStats()
  }
}
