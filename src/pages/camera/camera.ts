import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { Image } from '../../services/image';

@Component({
  templateUrl: 'camera.html'
})

export class CameraPage {

  _toolkit: any;
  _images: String[];
  _zip: any;

  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  constructor(private nav: NavController, private camera: Camera, private imageService: Image, private file: File) {
    /*let dir = this.file.getDirectory("../../assets/zip")
    this._zip = this.file.getFile(dir, "ExampleImage.zip");*/
  }

  savePicture() {
    this.imageService.getTask().subscribe(
      (resp) => {
        this.imageService.postTask().subscribe(
          (resp) => {
            this.imageService.uploadImage(this._zip).subscribe(
              (resp) => {
                console.log("UploadImageDone");
                this.nav.pop();
              }, (err) => {
                console.error("camera/uploadImageError: " + err);
                this.nav.pop();
              }
            );
          }, (err) => {
            console.error("camera/postTaskError: " + err);
            this.nav.pop();
          }
        );
      }, (err) => {
        console.error("camera/getTaskError: " + err);
        this.nav.pop();
      }
    );
  }




  getPicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}