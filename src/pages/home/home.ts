import { ModalController, NavController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

import { AlertService } from '../../services/alert.service';
import { ImageService } from '../../services/image.service';
import { LocationService } from '../../services/location.service';

import { Alert } from '../../models/alert';
import { Issue } from '../../models/issue';
import { DisplayIssue } from '../../models/displayIssue';

import { AlertDetailPage } from '../alertDetail/alertDetail';

@Component({
    templateUrl: 'home.html',
    selector: 'page-home'
})
/* 
   This page is used to choose a toolkit
   Can be use for localisation too.
*/

export class HomePage {
    private displayIssues: DisplayIssue[];
    private modal;
    locationName = "undefined";
    issuesNumber;
    mode;
    sort;
    tags = ["day", "week", "month", "extra_facing", "empty_slot", "out_of_stock", "misplaced_product"];
    _toolkit: any;

    constructor(
        private menuCtrl: MenuController,
        private modalCtrl: ModalController,
        private navCtrl: NavController,
        private alertService: AlertService,
        private imageService: ImageService,
        private locationService: LocationService
    ) {
        console.log("home/constructor");
        this.menuCtrl.enable(true);
        this.mode = " ";
        this.sort = "";
        this._toolkit = "y6W4gm";
        this.issuesNumber = 0;
        this.initialise();
    }

    toggleMenu() {
        console.log("home/toggleMenu");
        this.menuCtrl.toggle();
    }

    initialise() {
        console.log("home/initialise");
        this.imageService.getAnalysedImages(this._toolkit).subscribe(
            () => {
                this.locationService.getAllLocations().subscribe(
                    () => {
                        this.locationName = this.locationService.getLocationName(this.locationService.getLocationID());
                        this.initialiseAlert();                        
                    }
                )
            }
        );
    }

    initialiseAlert() {
        console.log("home/initialiseAlert");
        this.mode = " ";
        this.sort = "";
        this.alertService.getListAlert().subscribe(
            () => {
                this.displayIssues = this.alertService.getListDisplayIssues();
                this.issuesNumber = this.displayIssues.length;
                console.log("InitialiseAlert/length of displayIssues : " + this.displayIssues.length);
            }
        );
    }

    openIssue(issue: DisplayIssue) {
        console.log("home/openIssue");
        if (this.mode != " archived ") {
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
        console.log("home/switchArchiveMode");
        this.displayIssues = this.alertService.getListDisplayArchivedIssues();
        this.issuesNumber = this.displayIssues.length;
        this.mode = " archived ";
        this.sort = "";
    }

    filterAlert(tag: any) {
        console.log("home/filterAlert");
        this.sort = tag;
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
