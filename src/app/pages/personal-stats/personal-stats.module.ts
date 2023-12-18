import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalStatsPageRoutingModule } from './personal-stats-routing.module';

import { PersonalStatsPage } from './personal-stats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalStatsPageRoutingModule
  ],
  declarations: [PersonalStatsPage]
})
export class PersonalStatsPageModule {}
