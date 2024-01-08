import { Component, OnInit } from '@angular/core';
import { DatabaseService, Stats } from 'src/app/services/database.service';

@Component({
  selector: 'app-personal-stats',
  templateUrl: './personal-stats.page.html',
  styleUrls: ['./personal-stats.page.scss'],
})
export class PersonalStatsPage implements OnInit {
  protected stats!:Stats

  constructor(private database:DatabaseService) { }

  ngOnInit() {
    this.loadStats()
  }

  ionViewWillEnter(){
    this.loadStats()
  }

  async loadStats(){
    this.stats = await this.database.getStats()
  }
  
}
