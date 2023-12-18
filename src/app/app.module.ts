import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CommentModule } from './components/comment/comment.module';
import { IframeModule } from './components/iframe/iframe.module';
import { MenuComponentModule } from './components/menu/menu.component.module';
import { ArticleSnippetModule } from './components/article-snippet/article-snippet.module';
import {IonicStorageModule} from '@ionic/storage-angular'
import {_driver} from 'localforage-cordovasqlitedriver'
import { Drivers } from '@ionic/storage';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, 
    MenuComponentModule, CommentModule, IframeModule, ArticleSnippetModule,
  IonicStorageModule.forRoot({
    name:"hackernetDB",
    driverOrder:[_driver,Drivers.IndexedDB,Drivers.LocalStorage]
  })],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
