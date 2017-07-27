import { ModalController, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { Image } from '../../services/image';

@Component({
    templateUrl: 'imageDetail.html',
    selector: 'page-imageDetail'
})

export class ImageDetailPage {
    _images: String[];
    _index: any;

    constructor(public modalCtrl: ModalController, private nav: NavController, private navParam: NavParams, private imageService: Image) {
        console.log("imageDetailPage.ts/Constructor");
        this._index = this.navParam.get("photo_index");
        this._images = this.imageService._images;
    } 

    close() {
        this.nav.pop();
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
