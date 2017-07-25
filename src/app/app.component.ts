import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
//Load pages
import { HomePage } from '../pages/home/home';
import { AuthenticationPage } from '../pages/authentication/authentication';
//Load Services
import {UserService} from '../services/userServices';
import {ErrorService} from '../services/errorServices';

@Component({
  templateUrl: 'app.html',
  providers: [UserService, ErrorService],

})

export class MyApp {
  rootPage:any = AuthenticationPage;
  pages: Array<{title: string, component: any}>;

  constructor(private platform: Platform, private splashScreen: SplashScreen, private userService: UserService) {

    this.initializeApp();

    this.pages = [
      {title: 'Home', component: HomePage},
      {title: 'authentication', component: AuthenticationPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
      this.userService.init();
    });
  }
}
