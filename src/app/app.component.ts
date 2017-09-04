import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//Load pages
import { FirstRunPage } from '../pages/pages';
import { ReportPage } from '../pages/report/report';
import { AlertDetailPage } from '../pages/alertDetail/alertDetail';
import { StatistiquePage } from '../pages/statistique/statistique';
import { CameraPage } from '../pages/camera/camera';
import { ImageDetailPage } from '../pages/imageDetail/imageDetail';
import { CanvasPage } from '../pages/canvas/canvas';
import { HomePage } from '../pages/home/home';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { LocationListPage } from '../pages/locationList/locationList';
//Load Services

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = FirstRunPage;
  

  @ViewChild(Nav) nav: Nav;

  tabs = [
    {title: 'Home', component: HomePage},
    {title: 'Statistique', component: StatistiquePage},
    {title: 'Canvas', component: CanvasPage},
    {title: 'Camera', component: CameraPage}
  ]

  pages = [
    {title: 'AlertDetail', component: AlertDetailPage},
    {title: 'Report', component: ReportPage},
    {title: 'Statistique', component: StatistiquePage},
    {title: 'Camera', component: CameraPage},
    {title: 'ImageDetail', component: ImageDetailPage},
    {title: 'Canvas', component: CanvasPage},
    {title: 'Home', component: HomePage},
    {title: 'Authentication', component: AuthenticationPage},
    {title: 'LocationList', component: LocationListPage}
  ];

  constructor(
    private platform: Platform, 
    private statusBar: StatusBar, 
    private splashScreen: SplashScreen
  ) { }

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
