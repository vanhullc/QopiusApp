import { ToastController, AlertController, NavController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileReader } from '@ionic-native/file';
import { Base64 } from '@ionic-native/base64';

import { ImageService } from '../../services/image.service';
import { ZipService } from '../../services/zip.service';

import JSzip from 'jszip';

@Component({
  templateUrl: 'camera.html',
  selector: 'page-camera'
})

/* 
   This page is used to add new pics, zip this pics and upload the zip file to the server.
*/

export class CameraPage {
  // selected toolkit number
  _toolkit: any;
  // array of new pics by the user
  _images: string[] = [];
  // file path of the cache directory of the phone. Allow to write file on both iOS and Android
  options: CameraOptions;

  constructor(
    private base64: Base64,
    private menu: MenuController,
    private nav: NavController,
    private alertCtrl: AlertController,
    private file: File,
    private toastCtrl: ToastController,
    private camera: Camera,
    private imageService: ImageService,
    private zipService: ZipService
  ) {}

  /*
    SavePicture first create the zip and save it in the cache directory.
    Then it call multiple imageService function to upload the zip : 
    GetTask => PostTask => UploadImage
    Present a toast whenever it's done or not working
  */

  savePicture(zipPath: string) {
    this.imageService.getTask().subscribe(
      (resp) => {
        this.imageService.postTask().subscribe(
          (resp) => {
            this.imageService.uploadImage(zipPath).then(
              (resp) => {
                console.log("UploadImageDone");
                let toast = this.toastCtrl.create({
                  message: 'UploadImageDone: ' + JSON.stringify(resp),
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
              }, (err) => {
                console.error("camera/uploadImageError  " + JSON.stringify(err));
                let alert = this.alertCtrl.create({
                  message: 'camera/uploadImageError: ' + JSON.stringify(err)
                });
                alert.present();
              });
          }, (err) => {
            console.error("camera/postTaskError: " + JSON.stringify(err));
            let toast = this.toastCtrl.create({
              message: 'camera/postTaskError',
              duration: 10000,
              position: 'top'
            });
            toast.present();
          });
      }, (err) => {
        console.error("camera/getTaskError: " + JSON.stringify(err));
        let toast = this.toastCtrl.create({
          message: 'camera/getTaskError',
          duration: 10000,
          position: 'top'
        });
        toast.present();
      });
  }
  // Generate the zip file and return it to be written somewhere
  zipPics() {
    this.zipService.createZip(this._images);
    this.zipService.endEvent.subscribe(
      (response) => {
        if (response.sucess) {
          this.savePicture(response.path);
        }
      }
    )
  }

  // Change camera options to add pic from library
  getLibraryPicture() {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.getPicture();
  }
  // Change camera options to add pic from camera
  getCameraPicture() {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }
    this.getPicture();
  }

  // Get pic depending on the options selected. Create a toast if error 
  getPicture() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        this._images.push(imageData);
        console.log("image pushed");
      }, (err) => {
        // Handle error
        this._images.push("http://www.daimto.com/wp-content/uploads/2014/08/errorstop.png");
        console.log(this._images);
        let toast = this.toastCtrl.create({
          message: err,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
  }

  toggleMenu() {
    console.log("home/toggleMenu");
    this.menu.toggle();
  }
}