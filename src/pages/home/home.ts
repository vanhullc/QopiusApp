import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { User } from '../../services/user';

import { CanvasPage } from '../canvas/canvas';

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
    _toolkits: any[];
    constructor(private nav: NavController , private userService: User ) {
        this._toolkits = this.userService._user.toolkits;
    }

    openToolkitPage(toolkit:any) {
        this.nav.push(CanvasPage, {
            _toolkit: toolkit
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
