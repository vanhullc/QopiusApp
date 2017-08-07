import { ModalController, NavController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

import { AlertService } from '../../services/alert';

import { Alert } from '../../models/alert';

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
    private alerts: Alert[];
    private modal;
    alertNumber;
    mode;
    tags = ["Today", "Last Week", "Out_of_stock", "misplaced_product"];

    constructor(private menu: MenuController, private modalCtrl: ModalController, private nav: NavController, private alertService: AlertService) {
        console.log("home/constructor");
        this.menu.enable(true);
        this.mode = ".";
        this.alertNumber = 0;
        this.initialiseAlert();
    }

    toggleMenu() {
        console.log("home/toggleMenu");
        this.menu.toggle();
    }

    initialiseAlert() {
        this.alertService.getListAlert().subscribe(
            () => {
                this.alerts = this.alertService.listAlert;
                this.alertNumber = this.alerts.length;
                console.log("home/initialiseAlert/alerts:"+this.alerts.toString());
            },
            (err) => {
                console.error("initialiseAlertERROR");
            }
        );
        this.mode = ".";
    }

    openAlert(alert: Alert) {
        console.log("home/openAlert(id:" + alert.id.toString() + ")");
        this.modal = this.modalCtrl.create(AlertDetailPage, {alert: alert});
        this.modal.onDidDismiss(
            () => {
                this.initialiseAlert();
            }
        );
        this.modal.present();
    }

    switchArchiveMode() {
         this.alerts = this.alertService.getListArchivedAlert();
         this.alertNumber = this.alertService.getListArchivedAlert().length;
         this.mode = " archived";
    }

    filterAlert(filter: any) {
        console.log("home/filterAlert(filter: "+filter + ")");
        switch(filter) {
            case "Today":
                let today = new Date();
                this.alerts = this.alertService.filterAlertByDate(today);
                this.mode=" from today.";
                this.alertNumber = this.alertService.filterAlertByDate(today).length;
                break;
            case "Last Week":
                let lastWeek = new Date();
                lastWeek.setDate(lastWeek.getDate() - 7);
                this.alerts = this.alertService.filterAlertInferiorDate(lastWeek);
                this.mode=" from last week.";
                this.alertNumber = this.alertService.filterAlertInferiorDate(lastWeek).length;
                break;
            case "out_of_stock":
                this.alerts = this.alertService.filterAlertByType("out_of_stock");
                this.mode=" : Out of stock.";
                this.alertNumber = this.alertService.filterAlertByType("out_of_stock").length;
                break;
            case "misplaced_product":
                this.alerts = this.alertService.filterAlertByType("misplaced_productg");
                this.mode=" : misplaced_product.";
                this.alertNumber = this.alertService.filterAlertByType("misplaced_product").length;
                break;
        }
    }

}
