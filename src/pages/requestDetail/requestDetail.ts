import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { Request } from '../../models/request';

import { RequestService } from '../../services/request';

@Component ({
    templateUrl: 'requestDetail.html',
    selector: 'requestDetail.scss'
})

export class RequestDetailPage {
    private request: Request;
    image: any;

    constructor(private alertCtrl: AlertController, private navParams: NavParams, private nav: NavController, private requestService: RequestService) {
        this.request = this.navParams.get("request");
        this.image = this.request.image;
    }

    close() {
        let alert = this.alertCtrl.create({
            title: 'Why cannot you archive the request?',
            inputs: [
            {
                label: 'Product not available',
                value: 'Product not available',
                type: 'checkbox'
            },
            {
                label: 'Request error',
                value: 'Request error',
                type: 'checkbox'
            },
            {
                label: 'Mismatch photo/request',
                value: 'Mismatch photo/request',
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
                    this.request.cancelOptions.push(data);
                }
            }
            ]
        });
        alert.present();
    }

    validate() {
        this.requestService.remove(this.request);
        this.nav.pop();
    }
}