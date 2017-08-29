import { ModalController, NavController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

import { AlertService } from '../../services/alert';
import { Image } from '../../services/image';

import { Alert } from '../../models/alert';
import { Issue } from '../../models/issue';
import { DisplayIssue } from '../../models/displayIssue';

import { AlertDetailPage } from '../alertDetail/alertDetail';

@Component({
    templateUrl: 'home.html',
    selector: 'home.scss'
})
/* 
   This page is used to choose a toolkit
   Can be use for localisation too.
*/

export class HomePage {
    private displayIssues: DisplayIssue[];
    private modal;
    issuesNumber;
    mode;
    tags = ["day", "week", "month", "extra_facing", "empty_slot", "out_of_stock", "misplaced_product"];
    _toolkit: any;

    constructor(private menu: MenuController, private modalCtrl: ModalController, private nav: NavController, private alertService: AlertService, private imageService: Image) {
        console.log("home/constructor");
        this.menu.enable(true);
        this.mode = "";
        this._toolkit = "y6W4gm";
        this.issuesNumber = 0;
        this.initialise();
    }

    toggleMenu() {
        console.log("home/toggleMenu");
        this.menu.toggle();
    }

    initialise() {
        this.imageService.getAnalysedImages(this._toolkit).subscribe(
            () => {
                this.initialiseAlert();
            }
        );
    }

    initialiseAlert() {
        this.mode = "";
        this.alertService.getListAlert().subscribe(
            () => {
                this.displayIssues = this.alertService.getListDisplayIssues();
                this.issuesNumber = this.displayIssues.length;
                console.log("InitialiseAlert/length : " + this.displayIssues.length);
            }
        );
    }

    openIssue(issue: DisplayIssue) {
        if (this.mode != " archived") {
            console.log("home/openAlert(id:" + issue.issueID + ")");
            this.modal = this.modalCtrl.create(AlertDetailPage, { issue: issue });
            this.modal.onDidDismiss(
                () => {
                    this.initialiseAlert();
                }
            );
            this.modal.present();
        }
    }

    switchArchiveMode() {
        console.log("Home/switchArchiveMode");
        this.displayIssues = this.alertService.getListDisplayArchivedIssues();
        this.issuesNumber = this.displayIssues.length;
        this.mode = " archived";
    }

    filterAlert(tag: any) {
        if (tag === "day" || tag === "month" || tag === "week") {
            if (this.mode === " archived") {
                this.displayIssues = this.alertService.filterArchivedByDate(tag);
            }
            else {
                this.displayIssues = this.alertService.filterByDate(tag);
            }
            this.issuesNumber = this.displayIssues.length;
        }
        else {
            if (this.mode === " archived") {
                this.displayIssues = this.alertService.filterArchivedByType(tag);
            }
            else {
                this.displayIssues = this.alertService.filterByType(tag);
            }
            this.issuesNumber = this.displayIssues.length;
        }
    }
}
