import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SocketioService } from './socketio.service';
import{fromEvent} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private socketService:SocketioService,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private location: Location
  ) {
    this.initializeApp();
    this.backButton();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.socketService.setupSocketConnection();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.socketService.setupSocketConnection();
    });
  }

  backButton(){
    const event = fromEvent(document, 'backbutton');
    event.subscribe(async () => {
      this.location.back();
    });
  }
}
