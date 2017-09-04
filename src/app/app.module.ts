import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { AlertDetailPage } from '../pages/alertDetail/alertDetail';
import { ReportPage } from '../pages/report/report';
import { StatistiquePage } from '../pages/statistique/statistique';
import { CameraPage } from '../pages/camera/camera';
import { ImageDetailPage } from '../pages/imageDetail/imageDetail';
import { CanvasPage } from '../pages/canvas/canvas';
import { HomePage } from '../pages/home/home';
import { AuthenticationPage } from '../pages/authentication/authentication';
import { LocationListPage } from '../pages/locationList/locationList';

import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';
import { ImageService } from '../services/image.service';
import { AlertService } from '../services/alert.service';
import { AnalyticService } from '../services/analytic.service';
import { LocationService } from '../services/location.service';
import { MissionService } from '../services/mission.service';
import { LabelService } from '../services/label.service';
import { ZipService } from '../services/zip.service';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { Base64 } from '@ionic-native/base64';
import { ChartsModule } from 'ng2-charts/charts/charts';
import '../../node_modules/chart.js/dist/Chart.bundle.min.js';

@NgModule({
  declarations: [
    MyApp,
    ReportPage,
    AlertDetailPage,
    StatistiquePage,
    CameraPage,
    ImageDetailPage,
    CanvasPage,
    HomePage,
    AuthenticationPage,
    LocationListPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ReportPage,
    AlertDetailPage,
    StatistiquePage,
    CameraPage,
    ImageDetailPage,
    CanvasPage,
    AuthenticationPage,
    HomePage,
    LocationListPage
  ],
  providers: [
    ApiService,
    AlertService,
    UserService,
    ImageService,
    AnalyticService,
    LocationService,
    MissionService,
    LabelService,
    ZipService,
    File,
    Base64,
    FileTransfer,
    Camera, 
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
}) 
export class AppModule {}
