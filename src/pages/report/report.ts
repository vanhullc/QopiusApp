import { Component, ViewChild } from '@angular/core';
import { MenuController } from 'ionic-angular';

import { DatePicker } from '@ionic-native/date-picker';


@Component({
    templateUrl: 'report.html',
    selector: 'report.scss'
})

export class ReportPage {

    date: { start: String, end: String} = {
        start: '05/09/2016',
        end: '24/09/2016'
    }

    options = {
        date: new Date(),
        mode: 'date'
    };

    constructor(private menu: MenuController) {
        this.menu.enable(true);
        this.initialise();
    }

    onSuccess(date) {
        alert('Selected date: ' + date);
    }

    onError(error) { // Android only
        alert('Error: ' + error);
    }

    initialise() {

    }

    toggleMenu() {
        console.log("home/toggleMenu");
        this.menu.toggle();
    }
}