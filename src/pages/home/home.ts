import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { User } from '../../services/user';

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
    toolkits: any[];
    constructor(private nav: NavController , private userService: User ) {
        this.toolkits = this.userService._user.toolkits;
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
