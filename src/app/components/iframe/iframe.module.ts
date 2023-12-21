import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeComponent } from './components/iframe/iframe.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [IframeComponent],
  exports: [IframeComponent],
  imports: [
    IonicModule,
    CommonModule
  ]
})
export class IframeModule { }
