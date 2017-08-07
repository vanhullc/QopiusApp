import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Alert } from '../../models/alert';

import { AlertService } from '../../services/alert';

@Component ({
    templateUrl: 'alertDetail.html',
    selector: 'alertDetail.scss'
})

export class AlertDetailPage {
    private alert: Alert;
    image: any;

    constructor(private alertCtrl: AlertController, private navParams: NavParams, private nav: NavController, private alertService: AlertService) {
        this.alert = this.navParams.get("alert");
        this.image = this.alert.image;
    }

    close() {
        let alert = this.alertCtrl.create({
            title: 'Why cannot you archive the alert?',
            inputs: [
            {
                label: 'Product not available',
                value: 'Product not available',
                type: 'checkbox'
            },
            {
                label: 'Alert error',
                value: 'Alert error',
                type: 'checkbox'
            },
            {
                label: 'Mismatch photo/alert',
                value: 'Mismatch photo/alert',
                type: 'checkbox'
            },
            {
                label: 'Price not available',
                value: 'Price not available',
                type: 'checkbox'
            }
            ],
            buttons: [
            {
                text: 'Done',
                handler: data => {
                    this.nav.pop();
                    this.alert.cancelOptions.push(data);
                }
            }
            ]
        });
        alert.present();
    }

    validate() {
        this.alertService.remove(this.alert);
        this.nav.pop();
    }
}