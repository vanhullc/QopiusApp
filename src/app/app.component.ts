import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//Load pages
import { FirstRunPage } from '../pages/pages';
import { HomePage } from '../pages/home/home';
import { AuthenticationPage } from '../pages/authentication/authentication';
//Load Services
import { Settings } from '../services/settings';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages = [
    {title: 'Home', component: HomePage},
    {title: 'authentication', component: AuthenticationPage}
  ];

  constructor(private platform: Platform, settings: Settings, private config: Config, private statusBar: StatusBar, private splashScreen: SplashScreen) {
  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
