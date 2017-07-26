import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { User } from '../../services/user';
import { Image } from '../../services/image';

@Component({
    templateUrl: 'canvas.html'
})

export class CanvasPage {
    _toolkit: any;
    constructor(private nav: NavController, private navParam: NavParams, private userService: User, private imageService: Image) {
        this._toolkit = this.navParam.get("_toolkit");
        this.getAnalyseImage(this._toolkit);
    }

    getAnalyseImage(toolkit:any) {
        this.imageService.getAnalysedImage(toolkit);
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
