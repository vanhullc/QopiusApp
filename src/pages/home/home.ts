import { ModalController, NavController, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

import { RequestService } from '../../services/request';

import { Request } from '../../models/request';

import { RequestDetailPage } from '../requestDetail/requestDetail';

@Component({
    templateUrl: 'home.html',
    selector: 'home.scss'
})
/* 
   This page is used to choose a toolkit
   Can be use for localisation too.
*/

export class HomePage {
    private requests: Request[];
    private modal;
    requestNumber;
    mode;
    tags = ["Today", "Last Week", "Out of stock", "Price tag missing"];

    constructor(private menu: MenuController, private modalCtrl: ModalController, private nav: NavController, private requestService: RequestService) {
        console.log("home/constructor");
        this.menu.enable(true);
        this.mode = ".";
        this.requestNumber = 0;
        this.initialiseRequest();
    }

    toggleMenu() {
        console.log("home/toggleMenu");
        this.menu.toggle();
    }

    initialiseRequest() {
        this.requests = this.requestService.getListRequest();
        this.requestNumber = this.requestService.getListRequest().length;
        this.mode = ".";
    }

    openRequest(request: Request) {
        console.log("home/openRequest(id:" + request.id.toString() + ")");
        this.modal = this.modalCtrl.create(RequestDetailPage, {request: request});
        this.modal.onDidDismiss(
            () => {
                this.initialiseRequest();
            }
        );
        this.modal.present();
    }

    switchArchiveMode() {
         this.requests = this.requestService.getListArchivedRequest();
         this.requestNumber = this.requestService.getListArchivedRequest().length;
         this.mode = " archived";
    }

    filterRequest(filter: any) {
        console.log("home/filterRequest(filter: "+filter + ")");
        switch(filter) {
            case "Today":
                let today = new Date();
                this.requests = this.requestService.filterRequestByDate(today);
                this.mode=" from today.";
                this.requestNumber = this.requestService.filterRequestByDate(today).length;
                break;
            case "Last Week":
                let lastWeek = new Date();
                lastWeek.setDate(lastWeek.getDate() - 7);
                this.requests = this.requestService.filterRequestInferiorDate(lastWeek);
                this.mode=" from last week.";
                this.requestNumber = this.requestService.filterRequestInferiorDate(lastWeek).length;
                break;
            case "Out of stock":
                this.requests = this.requestService.filterRequestByType("Out of stock");
                this.mode=" : Out of stock.";
                this.requestNumber = this.requestService.filterRequestByType("Out of stock").length;
                break;
            case "Price tag missing":
                this.requests = this.requestService.filterRequestByType("Price tag missing");
                this.mode=" : Price tag missing.";
                this.requestNumber = this.requestService.filterRequestByType("Price tag missing").length;
                break;
        }
    }

}
