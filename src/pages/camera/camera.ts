import { ToastController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { Image } from '../../services/image';

import JSzip from 'jszip';

@Component({
  templateUrl: 'camera.html',
  selector: 'page-camera'
})

export class CameraPage {

  _toolkit: any;
  _images: any[] = [];
  _zip: any;
  htmlToAdd: any = "";

  options: CameraOptions;

  constructor(private sanitizer: DomSanitizer, private nav: NavController, private toast: ToastController, private camera: Camera, private imageService: Image, private file: File) {
  }

  savePicture() {
    this.zipPics(this._images);
    this.imageService.getTask().subscribe(
      (resp) => {
        this.imageService.postTask().subscribe(
          (resp) => {
            this.imageService.uploadImage(this._zip).then(
              (resp) => {
                console.log("UploadImageDone");
                let toast = this.toast.create({
                  message: 'UploadImageDone',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                this.nav.pop();
              }, (err) => {
                console.error("camera/uploadImageError: " + err);
                let toast = this.toast.create({
                  message: 'camera/uploadImageError',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
                this.nav.pop();
              }
            );
          }, (err) => {
            console.error("camera/postTaskError: " + err);
            let toast = this.toast.create({
                  message: 'camera/postTaskError',
                  duration: 3000,
                  position: 'top'
                });
                toast.present();
            this.nav.pop();
          }
        );
      }, (err) => {
        console.error("camera/getTaskError: " + err);
        let toast = this.toast.create({
                  message: 'camera/getTaskError',
                  duration: 3000,
                  position: 'top'
                });
        toast.present();
        this.nav.pop();
      }
    );
  }

  zipPics(files: any[]){
    let zip = new JSzip();
    for(let i = 0; i < files.length; i++) {
        zip.file(files[i]);   
    }
    this._zip = zip.generateAsync({type:"uint8array"});
  }

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


  getPicture() {
    this.camera.getPicture(this.options).then(
      (imageData) => {
        //this.htmlToAdd += "<div class=\"image__square\"\><img [src]=\""+ imageData +"\" /\></div\>";
        this._images.push(imageData);
       let toast = this.toast.create({
          message: "new pic success",
          duration: 3000,
          position: 'top'
        });
        toast.present();
    }, (err) => {
      // Handle error
      console.log(this._images);
        let toast = this.toast.create({
          message: err,
          duration: 3000,
          position: 'top'
        });
        toast.present();
    });
  }
}