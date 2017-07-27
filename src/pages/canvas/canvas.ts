import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { User } from '../../services/user';
import { Image } from '../../services/image';

import { ImageDetailPage } from '../imageDetail/imageDetail';
import { CameraPage } from '../camera/camera';

@Component({
    templateUrl: 'canvas.html',
    selector: 'page-canvas'
})

export class CanvasPage {
    _toolkit: any;
    _images: String[];

    constructor(public modalCtrl: ModalController, private nav: NavController, private navParam: NavParams, private userService: User, private imageService: Image) {
        console.log("canvas.ts/Constructor");
        this._toolkit = this.navParam.get("_toolkit");
        console.log("toolkit: " + this._toolkit);
        this._images = this.imageService._images;
        console.log("image: " + this._images[0]);
    }

    openPhoto(index: any) {
        let modal = this.modalCtrl.create(ImageDetailPage, { photo_index: index });
        modal.present();
    }

    openCamera() {
        this.nav.push(CameraPage);
    }

    onPageLoaded() {

    }

    onPageWillEnter() {
        /*to do just before the display of the page*/
    }
    onPageDidEnter() { }
    onPageWillLeave() {
        /*to do just before the page is leaved*/
    }
    onPageDidLeave() { }
    onPageWillUnload() { }
    onPageDidUnload() { }

    disconnect() {

    }
}
