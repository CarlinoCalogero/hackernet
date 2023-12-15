import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeComponent } from './components/iframe/iframe.component';



@NgModule({
  declarations: [IframeComponent],
  exports: [IframeComponent],
  imports: [
    CommonModule
  ]
})
export class IframeModule { }
