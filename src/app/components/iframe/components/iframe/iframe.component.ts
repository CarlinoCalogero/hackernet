import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Browser } from '@capacitor/browser';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.scss'],
})
export class IframeComponent implements OnInit {

  @Input() url!: string

  protected webResource!: SafeResourceUrl

  constructor(
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.webResource = this.domSanitizer.bypassSecurityTrustResourceUrl(this.url)
    //this.webResource = this.domSanitizer.bypassSecurityTrustResourceUrl("https://konosuba.com/")
  }

  async onButtonClick() {
    await Browser.open({ url: this.url });
  }

}
