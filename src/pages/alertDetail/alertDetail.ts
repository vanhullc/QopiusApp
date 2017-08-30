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
    selector: 'page-alertDetail'
})

export class AlertDetailPage {
    @ViewChild("bgimg") img: ElementRef;
    timer: Subscription;
    resolutionScale: number;
    private issue: DisplayIssue;
    image: AnalysedImage;
    visible: boolean = true;
    boxStyle;

    constructor(private alertCtrl: AlertController, private navParams: NavParams, private nav: NavController, private alertService: AlertService, private imageService: Image) {
        this.issue = this.navParams.get("issue");
        this.image = this.alertService.getIssueAnalysedImage(this.issue.image_name, this.issue.boxID);
        console.log("BOOOOOOOOOOOOOOOOOXID ===== "+this.issue.boxID);
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

    initBoxStyle() {

    }

    getKeysArray() {
        if (this.image.boxes) {
            return Object.keys(this.image.boxes);
        }
        else {
            return false;
        }

    }

    close() {
        let alert = this.alertCtrl.create({
            title: 'Why cannot you archive the alert?',
            inputs: [
                {
                    label: 'not in warehouse',
                    value: 'not in warehouse',
                    type: 'checkbox'
                },
                {
                    label: 'new product',
                    value: 'new product',
                    type: 'checkbox'
                },
                {
                    label: 'store promotion',
                    value: 'store promotion',
                    type: 'checkbox'
                }
            ],
            buttons: [
                {
                    text: 'Done',
                    handler: data => {
                        this.alertService.dismissAlertFeedback(this.issue.alertID, this.issue.name, "error", data);
                        this.nav.pop();
                    }
                }
            ]
        });
        alert.present();
    }

    validate() {
        this.alertService.changeIssueStatus(this.issue.alertID, this.issue.name, "completed").subscribe(
            (res) => {
                this.nav.pop();
            },
            (err) => {
                this.nav.pop();
            }
        );
    }
}