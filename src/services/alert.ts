import { Injectable } from '@angular/core';

import { Alert } from '../models/alert';
import { Issue } from '../models/issue';
import { Type } from '../models/type';
import { DisplayIssue } from '../models/displayIssue';

import { Api } from '../services/api';

import { Http } from '@angular/http';
import { User } from '../services/user';
import { Image } from '../services/image';

@Injectable()

export class AlertService {
    listAlert: Alert[];
    listAlertArchived: Alert[];
    _toolkit: any = "y6W4gm";
    locationID: string = "Es4bGvNFPL";
    missionID: string = "oPerGdf345";

    constructor(public http: Http, public api: Api, public user: User, private imageService: Image) {
        this.initialise();
    }

    initialise() {
        console.log("alertService/initialise");
    }

    getListAlert() {
        console.log("alertService/getListAlert");

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            locationID: this.locationID,
            missionID: this.missionID,
            timeDelta: 10000000
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

    getIssueAnalysedImage(image_name: any) {
        return this.imageService.getAnalysedImageByName(image_name);
    }

    saveAlert(res) {
        this.listAlert = [];
        this.listAlertArchived = [];
        let tempAlert: Alert;
        for (let i = 0; i < res.length; i++) {
            console.log("DEBUG: " + res[i].missionID + res[i].text + res[i].companyID + res[i].trigger_time + res[i].locationID + res[i].issues);
            tempAlert = res[i];
            if (tempAlert.status !== "completed") {
                this.listAlert.push(tempAlert);
            }
            else {
                this.listAlertArchived.push(tempAlert);
            }

        }
        console.log("alertService/saveAlert/length : " + this.listAlert.length);
    }

    getListArchivedAlert() {
        console.log("alertService/getListArchivedAlert");
        return this.listAlertArchived;
    }

    getListDisplayIssues() {
        let listDisplayIssues: DisplayIssue[] = [];
        let displayIssue: DisplayIssue;
        let product: any;
        for (let i = 0; i < this.listAlert.length; i++) {
            for (let j = 0; j < this.listAlert[i].issues.length; j++) {
                if (this.listAlert[i].issues[j].type[0]) {
                    product = "";
                    for (let k = 0; k < this.listAlert[i].issues[j].type.length; k++) {
                        if(this.listAlert[i].issues[j].type[k].name){
                            product += this.listAlert[i].issues[j].type[k].name + " ";
                        }
                        else if (this.listAlert[i].issues[j].type[k].real){
                            product += this.listAlert[i].issues[j].type[k].real + " ";
                        }
                        else {
                            product += this.listAlert[i].issues[j].type[k] + " ";
                        }
                    }
                }
                displayIssue = {
                    "name": this.listAlert[i].issues[j].name,
                    "product": product,
                    "timestamp": this.listAlert[i].trigger_time,
                    "alertID": this.listAlert[i].id,
                    "issueID": j,
                    "image_name": this.listAlert[i].image_name
                }
                listDisplayIssues.push(displayIssue);
            }
        }
        return listDisplayIssues;
    }

    getListDisplayArchivedIssues() {
        let listDisplayIssues: DisplayIssue[] = [];
        let displayIssue: DisplayIssue;
        let product: any;
        for (let i = 0; i < this.listAlertArchived.length; i++) {
            for (let j = 0; j < this.listAlertArchived[i].issues.length; j++) {
                if (this.listAlertArchived[i].issues[j].name) {
                    product = this.listAlertArchived[i].issues[j].name;
                }
                else if (this.listAlertArchived[i].issues[j].type[0]) {
                    product = "";
                    for (let k = 0; k < this.listAlertArchived[i].issues[j].type.length; k++) {
                        product += this.listAlertArchived[i].issues[j].type[k].name;
                    }
                }
                else {
                    product = "product";
                }
                displayIssue = {
                    "name": this.listAlertArchived[i].issues[j].name,
                    "product": product,
                    "timestamp": this.listAlertArchived[i].trigger_time,
                    "alertID": this.listAlertArchived[i].id,
                    "issueID": j,
                    "image_name" : this.listAlertArchived[i].image_name
                }
            }
        }
        return listDisplayIssues;
    }


    /* All filter are out to date */

    filterType(tag: string) {
        let listAlertFiltered: Alert[] = [];
        for (let i = 0; i < this.listAlert.length; i++) {
            for (let j = 0; j < this.listAlert[i].issues.length; j++) {
                if (this.listAlert[i].issues[j].name == tag) {
                    listAlertFiltered.push(this.listAlert[i]);
                }
            }
        }
        return listAlertFiltered;
    }
}