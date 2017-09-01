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
    listDisplayIssues: DisplayIssue[];
    listArchivedDisplayIssues: DisplayIssue[];
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

    dismissAlertFeedback(alertID: string, issue: string, status: string, feedback: string) {
        console.log("alertService/changeIssueStatus");

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            mode: "update_issue_status",
            alertID: alertID,
            issue: issue,
            status: status,
            feedback: feedback
        }

        let seq = this.api.post('alert', body).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                if (res === "success") {
                    console.log("ChangeIssueStatus succeed")
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, err => {
                console.error('ERROR', err);
            });
        return seq;
    }

    changeIssueStatus(alertID: string, issue: string, status: string) {
        console.log("alertService/changeIssueStatus");

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            mode: "update_issue_status",
            alertID: alertID,
            issue: issue,
            status: status
        }

        let seq = this.api.post('alert', body).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                if (res === "success") {
                    console.log("ChangeIssueStatus succeed")
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, err => {
                console.error('ERROR', err);
            });
        return seq;
    }

    getIssueAnalysedImage(image_name: any, boxID: number[]) {
        return this.imageService.getAnalysedImageByName(image_name, boxID);
    }

    saveAlert(res) {
        this.listAlert = [];
        let tempAlert: Alert;
        for (let i = 0; i < res["alerts"].length; i++) {
            //console.log("DEBUG: " + res[i].missionID + res[i].text + res[i].companyID + res[i].trigger_time + res[i].locationID + res[i].issues);
            tempAlert = res["alerts"][i];
            this.listAlert.push(tempAlert);
        }
        console.log("alertService/saveAlert/length : " + this.listAlert.length);
    }

    getListDisplayIssues() {
        this.listDisplayIssues = [];
        let displayIssue: DisplayIssue;
        let product: any;
        let boxID: number[];
        for (let i = 0; i < this.listAlert.length; i++) {
            // CHANGE IN PENDING WHEN TEST IS OVER
            if (this.listAlert[i].status === "error" || this.listAlert[i].status === "pending") {
                for (let j = 0; j < this.listAlert[i].issues.length; j++) {
                    boxID = [];
                    if (this.listAlert[i].issues[j].status === "pending" || this.listAlert[i].issues[j].status === "error") {
                        if (this.listAlert[i].issues[j].type[0]) {
                            product = "";
                            for (let k = 0; k < this.listAlert[i].issues[j].type.length; k++) {
                                if (this.listAlert[i].issues[j].type[k].boxID) {
                                    for (let l = 0; l < this.listAlert[i].issues[j].type[k].boxID.length; l++) {
                                        boxID.push(this.listAlert[i].issues[j].type[k].boxID[l]);
                                    }
                                }
                                if (this.listAlert[i].issues[j].type[k].name) {
                                    product += this.listAlert[i].issues[j].type[k].name + " ";
                                }
                                else if (this.listAlert[i].issues[j].type[k].real) {
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
                            "status": this.listAlert[i].issues[j].status,
                            "feedback": this.listAlert[i].issues[j].feedback,
                            "timestamp": this.listAlert[i].trigger_time,
                            "alertID": this.listAlert[i].id,
                            "issueID": j,
                            "image_name": this.listAlert[i].image_name,
                            "boxID": boxID
                        }
                        this.listDisplayIssues.push(displayIssue);
                    }
                }
            }
        }
        return this.listDisplayIssues;
    }

    getListDisplayArchivedIssues() {
        console.log("alertService/getListDisplayArchivedIssues");
        this.listArchivedDisplayIssues = [];
        let displayIssue: DisplayIssue;
        let product: any;
        let boxID: number[];
        for (let i = 0; i < this.listAlert.length; i++) {
            for (let j = 0; j < this.listAlert[i].issues.length; j++) {
                boxID = [];
                if (this.listAlert[i].issues[j].status === "completed") {
                    product = "";
                    if (this.listAlert[i].issues[j].name) {
                        product = this.listAlert[i].issues[j].name;
                    }
                    if (this.listAlert[i].issues[j].type[0]) {
                        for (let k = 0; k < this.listAlert[i].issues[j].type.length; k++) {
                            if (this.listAlert[i].issues[j].type[k].boxID) {
                                for (let l = 0; l < this.listAlert[i].issues[j].type[k].boxID.length; l++) {
                                    boxID.push(this.listAlert[i].issues[j].type[k].boxID[l]);
                                }
                            }
                            if (this.listAlert[i].issues[j].type[k].name) {
                                product += this.listAlert[i].issues[j].type[k].name + " ";
                            }
                            else if (this.listAlert[i].issues[j].type[k].real) {
                                product += this.listAlert[i].issues[j].type[k].real + " ";
                            }
                            else {
                                product += this.listAlert[i].issues[j].type[k] + " ";
                            }
                        }
                    }
                    else {
                        product = "product";
                    }

                    displayIssue = {
                        "name": this.listAlert[i].issues[j].name,
                        "product": product,
                        "status": this.listAlert[i].issues[j].status,
                        "feedback": this.listAlert[i].issues[j].feedback,
                        "timestamp": this.listAlert[i].trigger_time,
                        "alertID": this.listAlert[i].id,
                        "issueID": j,
                        "image_name": this.listAlert[i].image_name,
                        "boxID": boxID
                    }
                    this.listArchivedDisplayIssues.push(displayIssue);
                }
            }
        }
        return this.listArchivedDisplayIssues;
    }


    /* All filter are out to date */

    filterByType(tag: string) {
        let filteredDisplayIssues: DisplayIssue[] = [];
        for (let i = 0; i < this.listDisplayIssues.length; i++) {
            if (this.listDisplayIssues[i].name === tag) {
                filteredDisplayIssues.push(this.listDisplayIssues[i]);
            }
        }
        return filteredDisplayIssues;
    }

    filterArchivedByType(tag: string) {
        let filteredDisplayIssues: DisplayIssue[] = [];
        for (let i = 0; i < this.listArchivedDisplayIssues.length; i++) {
            if (this.listArchivedDisplayIssues[i].name === tag) {
                filteredDisplayIssues.push(this.listArchivedDisplayIssues[i]);
            }
        }
        return filteredDisplayIssues;
    }

    filterByDate(tag: string) {
        let date = new Date().valueOf();
        date = date / 1000;
        if(tag === "day") {
            date -= 86400;
        }
        else if (tag === "week") {
            date -= 604800;
        }
        else if (tag === "month") {
            date -= 2629743;
        }
        console.log("date: "+date);
        let filteredDisplayIssues: DisplayIssue[] = [];
        for (let i = 0; i < this.listDisplayIssues.length; i++) {
            console.log("timestamp: "+this.listDisplayIssues[i].timestamp);
            if (parseInt(this.listDisplayIssues[i].timestamp) >= date) {
                filteredDisplayIssues.push(this.listDisplayIssues[i]);
            }
        }
        return filteredDisplayIssues;
    }

    filterArchivedByDate(tag: string) {
        let date = new Date().valueOf();
        date = date / 1000;
        if(tag === "day") {
            date -= 86400;
        }
        else if (tag === "week") {
            date -= 604800;
        }
        else if (tag === "month") {
            date -= 2629743;
        }
        let filteredDisplayIssues: DisplayIssue[] = [];
        for (let i = 0; i < this.listArchivedDisplayIssues.length; i++) {
            if (parseInt(this.listArchivedDisplayIssues[i].timestamp) >= date) {
                filteredDisplayIssues.push(this.listArchivedDisplayIssues[i]);
            }
        }
        return filteredDisplayIssues;
    }
}