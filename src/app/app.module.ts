import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage, IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { CameraPage } from '../pages/camera/camera';
import { ImageDetailPage } from '../pages/imageDetail/imageDetail';
import { CanvasPage } from '../pages/canvas/canvas';
import { HomePage } from '../pages/home/home';
import { AuthenticationPage } from '../pages/authentication/authentication';

import { Api } from '../services/api';
import { User } from '../services/user';
import { Settings } from '../services/settings';
import { Image } from '../services/image';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */
  return new Settings(storage, {
    test: "test",
    test2: "test"
  });
}

@NgModule({
  declarations: [
    MyApp,
    CameraPage,
    ImageDetailPage,
    CanvasPage,
    HomePage,
    AuthenticationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CameraPage,
    ImageDetailPage,
    CanvasPage,
    AuthenticationPage,
    HomePage
  ],
  providers: [
    Api,
    User,
    Image,
    File,
    FileTransfer,
    Camera, 
    StatusBar,
    SplashScreen,
    { provide: Settings, useFactory: provideSettings, deps: [Storage] },
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
}) 
export class AppModule {}
