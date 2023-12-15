import { NgModule } from '@angular/core';
import { MenuComponent } from './menu.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [MenuComponent],
    imports: [ CommonModule,FormsModule,IonicModule],
    exports: [MenuComponent]
})
export class MenuComponentModule {}
