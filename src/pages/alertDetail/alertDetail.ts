import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { DisplayIssue } from '../../models/displayIssue';
import { AnalysedImage } from '../../models/analysedImage';

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { AlertService } from '../../services/alert';
import { Image } from '../../services/image';

@Component({
    templateUrl: 'alertDetail.html',
    selector: 'alertDetail.scss'
})

export class AlertDetailPage {
    @ViewChild("bgimg") img: ElementRef;
    timer: Subscription;
    resolutionScale: number;
    private issue: DisplayIssue;
    image: AnalysedImage;
    visible: boolean = true;

    constructor(private alertCtrl: AlertController, private navParams: NavParams, private nav: NavController, private alertService: AlertService, private imageService: Image) {
        this.issue = this.navParams.get("issue");
        this.image = this.alertService.getIssueAnalysedImage(this.issue.image_name);
    }

    getKeysArray() {
        if (this.image.boxes) {
            console.log("WAZAAAAAAAAAAAAAAAAAAAAAAAAAAAAA");
            return Object.keys(this.image.boxes);
        }
        else {
            return false;
        }

    }

    ngAfterViewInit() {
        // Perdiodically check for resolution change, and redraw boxes when needed
        // There may be some better, event based way to do this, but I haven't found any
        this.timer = Observable.interval(500).subscribe(() => {
            let resolutionScale = this.img.nativeElement.height /
                this.img.nativeElement.naturalHeight;
            if (this.resolutionScale != resolutionScale) {
                this.resolutionScale = resolutionScale;
                this.visible = true;
            }
        });
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
                    }
                }
            ]
        });
        alert.present();
    }

    validate() {
        //this.alertService.remove(this.alert);
        this.nav.pop();
    }
}