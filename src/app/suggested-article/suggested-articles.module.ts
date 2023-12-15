
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { SuggestedArticlesComponent } from './suggested-articles.component';
import { SuggestedArticlesRoutingModule } from './suggested-articles-routing.module';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular/ionic-module';


@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuggestedArticlesRoutingModule, 
]
})
export class SuggestedArticlesModule {}
