import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonComponent } from './component/share-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [ShareButtonComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports:[ShareButtonComponent]
})
export class ShareButtonModule { }
