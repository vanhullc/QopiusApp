import { ToastController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { User } from '../../services/user';
import { Image } from '../../services/image';

import { CanvasPage } from '../canvas/canvas';

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
    _toolkits: any[];
    private getImageErrorString: "get toolkit images error"

    constructor(public toastCtrl: ToastController, private nav: NavController , private userService: User , private imageService: Image) {
        this._toolkits = this.userService._user.toolkits;
    }

    openToolkitPage(toolkit:any) {
        this.imageService.getAnalysedImages(toolkit).subscribe(
            (resp) => {
                this.nav.push(CanvasPage, {
                    _toolkit: toolkit
                });
            }, (err) => {
                // Unable to get Images
                let toast = this.toastCtrl.create({
                    message: this.getImageErrorString,
                    duration: 3000,
                    position: 'top'
                });
                toast.present();
            });
    }

    onPageLoaded(){

    }

    onPageWillEnter() {
        /*to do just before the display of the page*/
    }
    onPageDidEnter(){}
    onPageWillLeave() {
    /*to do just before the page is leaved*/
    }
    onPageDidLeave() {}
    onPageWillUnload() {}
    onPageDidUnload() {}

    disconnect() {

    }
}
