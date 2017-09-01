import { Component, ViewChild, ElementRef } from '@angular/core';

import { PopoverController, NavParams } from 'ionic-angular';

@Component({
    templateUrl: 'locationList.html',
    selector: './page-locationList'
})
export class LocationListPage {
    locationList; any;

    constructor(private navParams: NavParams) {
        this.locationList = this.navParams.get("locationList");
        
    }

}