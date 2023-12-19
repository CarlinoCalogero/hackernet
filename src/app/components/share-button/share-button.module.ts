import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonComponent } from './components/share-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ShareButtonComponent],
  exports:[ShareButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ShareButtonModule { }
