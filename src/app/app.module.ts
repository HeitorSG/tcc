import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { HttpClientModule } from '@angular/common/http';
import { SocketioService } from './socketio.service';
import {LocalStorageService} from './local-storage.service';
import {NgxAgoraModule} from 'ngx-agora';
import { environment } from 'src/environments/environment';
const agoraConfig = {
  AppID: 'af7cf4e1dc8e4c1597497b3bbcead4c0'
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,NgxAgoraModule.forRoot(agoraConfig)],
  providers: [
    LocalStorageService,
    SocketioService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
