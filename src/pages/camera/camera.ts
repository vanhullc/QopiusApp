import { ToastController, AlertController, NavController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, FileReader } from '@ionic-native/file';

import { Image } from '../../services/image';

import JSzip from 'jszip';
import JSZipUtils from 'jszip-utils';

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
  // file path of the new zip
  _zip: any;
  // file path of the cache directory of the phone. Allow to write file on both iOS and Android
  _memoryDirectory: any;
  options: CameraOptions;

  constructor(private menu: MenuController, private nav: NavController, private alert: AlertController, private file: File, private toast: ToastController, private camera: Camera, private imageService: Image) {
    this._memoryDirectory = this.file.externalCacheDirectory;
  }

  /*
    SavePicture first create the zip and save it in the cache directory.
    Then it call multiple imageService function to upload the zip : 
    GetTask => PostTask => UploadImage
    Present a toast whenever it's done or not working
  */

  savePicture() {
    this.zipPics(this._images).then(
      (content) => {
        this.file.createFile(this._memoryDirectory, "Images.zip", true).then(
          (res) => {
            console.log("file created" + (JSON.stringify(res)));
            this.file.writeExistingFile(this._memoryDirectory, "Images.zip", content).then(
              (res) => {
                console.log("zip file writed" + (JSON.stringify(res)));

                this._zip = this._memoryDirectory + "Images.zip";
                this.imageService.getTask().subscribe(
                  (resp) => {
                    this.imageService.postTask().subscribe(
                      (resp) => {
                        this.imageService.uploadImage(this._zip).then(
                          (resp) => {
                            console.log("UploadImageDone");
                            let toast = this.toast.create({
                              message: 'UploadImageDone: ' + JSON.stringify(resp),
                              duration: 3000,
                              position: 'top'
                            });
                            toast.present();
                          }, (err) => {
                            console.error("camera/uploadImageError  " + JSON.stringify(err));
                            let alert = this.alert.create({
                              message: 'camera/uploadImageError: ' + JSON.stringify(err)
                            });
                            alert.present();
                          });
                      }, (err) => {
                        console.error("camera/postTaskError: " + JSON.stringify(err));
                        let toast = this.toast.create({
                          message: 'camera/postTaskError',
                          duration: 10000,
                          position: 'top'
                        });
                        toast.present();
                      });
                  }, (err) => {
                    console.error("camera/getTaskError: " + JSON.stringify(err));
                    let toast = this.toast.create({
                      message: 'camera/getTaskError',
                      duration: 10000,
                      position: 'top'
                    });
                    toast.present();
                  });
              });
          });
      },
      (err) => {
        console.error("ERROR: zip file not created: " + err);
      });
  }
  // Generate the zip file and return it to be written somewhere
  zipPics(files: any[]) {
    console.log("camera/zipPIcs");
    let zip = new JSzip();
    for (let i = 0; i < files.length; i++) {
      console.log(i);
      console.log(files[i]);
      console.log(files[i].substr(63));
      zip.file(i+'.jpg', files[i], {base64: true});
      
      /*
      this.file.resolveDirectoryUrl(this._memoryDirectory).then(
        (dirEntry) => {
          this.file.getFile(dirEntry, files[i].substr(63), {}).then(
            (data) => {
              data.file(
                (file) => {
                  zip.file(i+'.jpg', file);
                },
                (err) => {
                  console.log("error getting file : " + JSON.stringify(err));
                  throw(err);
                }
              )
            },
            (err) => {
              console.log("error getting file Entry : " + JSON.stringify(err));
              throw(err);
            }
          );
        },
        (err) => {
          console.log("error resolving Directory Url: " + JSON.stringify(err));
          throw(err);
        }
      );
      */
    }
    return zip.generateAsync({ "type": "blob" });
  }

  // Change camera options to add pic from library
  getLibraryPicture() {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
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
      destinationType: this.camera.DestinationType.DATA_URL,
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
        let toast = this.toast.create({
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