import { Injectable } from '@angular/core';

import { Alert } from '../models/alert';

import { Api } from '../services/api';

import { Http } from '@angular/http';
import { User } from '../services/user';

@Injectable()

export class AlertService { 
    listAlert: Alert[];
    listAlertArchived: Alert[];
    _toolkit: any = "y6W4gm";
    locationID: string = "Es4bGvNFPL";
    missionID: string = "oPerGdf345";

    constructor(public http: Http, public api: Api, public user: User) {
        this.initialise();
    }

    initialise() {
        console.log("alertService/initialise");
        this.listAlert = [];
        this.listAlertArchived = [];
    }

    getListAlert() {
        console.log("alertService/getListAlert");

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            locationID: this.locationID,
            missionID: this.missionID,
            //companyID: "ISHJJh"
        }

        let seq = this.api.get('alert', body).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                if (!res.message) {
                    this.saveAlert(res);
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, err => {
                console.error('ERROR', err);
            });
        return seq;

    }

    saveAlert(resp) {
        this.listAlert = [];
        for (let i = 0; i < resp.length; i++) {
            console.log("DEBUG: "+ resp[i].missionID + resp[i].text + resp[i].companyID + resp[i].trigger_time + resp[i].locationID + resp[i].issues);
            this.listAlert.push(new Alert(i, resp[i].missionID, resp[i].text, resp[i].companyID, resp[i].trigger_time, resp[i].locationID, resp[i].issues));
        }
        console.log("alertService/saveAlert/length : " + this.listAlert.length);
    }

    getListArchivedAlert() {
        console.log("alertService/getListArchivedAlert");
        return this.listAlertArchived;
    }

    remove(alert: Alert) {
        console.log("alertService/remove alertId: " + alert.id);
        let listAlertFiltered: Alert[] = [];
        for(let i = 0; i < this.listAlert.length; i++) {
            if(this.listAlert[i] != alert) {
                listAlertFiltered.push(this.listAlert[i]);
            }
            else {
                this.listAlertArchived.push(this.listAlert[i]);
            }
        }
        this.listAlert = listAlertFiltered;
    }

    /* All filter are out to date */

    filterAlertByType(filterAlert: String) {
        console.log("alertService/filteralertByType");
        let listAlertFiltered: Alert[] = [];
        switch (filterAlert) {
            case "extra_facing" : 
                this.filterType(1, listAlertFiltered);
                break;
            case "empty_slot" : 
                this.filterType(2, listAlertFiltered);
                break;
            case "forbidden_product" : 
                this.filterType(3, listAlertFiltered);
                break;
            case "misplaced_product" : 
                this.filterType(4, listAlertFiltered);
                break;
            case "out_of_stock" : 
                this.filterType(5, listAlertFiltered);
                break;
            }
        return listAlertFiltered;
    }

    filterType(i, listAlertFiltered) {
        for(let i = 0; i < this.listAlert.length; i++) {
            if(this.listAlert[i].issues[i] != "") {
                listAlertFiltered.push(this.listAlert[i]);
            }
        }
    }

    filterAlertByDate(filterAlert: Date) {
        console.log("alertService/filterAlertByDate");
        let listAlertFiltered: Alert[] = [];
        for(let i = 0; i < this.listAlert.length; i++) {
            if(this.listAlert[i].date.getDate() === filterAlert.getDate() && 
               this.listAlert[i].date.getMonth() === filterAlert.getMonth() && 
               this.listAlert[i].date.getFullYear() === filterAlert.getFullYear()) {
                listAlertFiltered.push(this.listAlert[i]);
            }
        }
        return listAlertFiltered;
    }

    filterAlertInferiorDate(filterAlert: Date) {
        console.log("alertService/filterAlertInferiorDate");
        let listAlertFiltered: Alert[] = [];
        for(let i = 0; i < this.listAlert.length; i++) {
            if(this.listAlert[i].date.getTime() >= filterAlert.getTime()) {
                listAlertFiltered.push(this.listAlert[i]);
            }
        }
        return listAlertFiltered;
    }
}