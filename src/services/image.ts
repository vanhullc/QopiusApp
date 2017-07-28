import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalysedImage } from '../models/analysedImage';

import { Api } from '../services/api';
import { User } from '../services/user';

import { Http } from '@angular/http';

import 'rxjs/Rx';


@Injectable()

export class Image {
    _analyzedImage: AnalysedImage[];
    _images: String[];
    _taskID: String;
    _toolkit: any;
    postImageUrl: string = "http://train2.qopius.com:8000/upload";
    locationID: string = "skip";
    missionID: string = "skip";
    task_mode: String = "prod";


    constructor(public http: Http, public api: Api, public user: User) {
        this.http = http;
        this.api = api;
        this.user = user;
    }

    getTask() {
        console.log("service/getTask");

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            toolkit: this._toolkit,
            mode: "new",
            task_mode: this.task_mode
        }

        let seq = this.api.get('task', body).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                if (res.taskID) {
                    this.saveTask(res);
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, err => {
                console.error('ERROR', err);
            });
        return seq;
    }

    postTask() {
        console.log("service/postTask");

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            toolkit: this._toolkit,
            locationID: this.locationID,
            missionID: this.missionID,
            taskID: this._taskID,
            mode: "prod",
            url_server: this.postImageUrl
        }

        let seq = this.api.post('task', body).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                if (res.taskID) {
                    console.log("Post task complete");
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, err => {
                console.error('ERROR', err);
            });
        return seq;
    }

    uploadImage(zipFile: File) {
        console.log("service/uploadImage");

        let body = {
            params: {
                accountID: this.user._user.accountID,
                session_password: this.user._user.session_password,
                toolkitID: this._toolkit,
                taskID: this._taskID,
                mode: "zip",
                file: zipFile
            }
        }

        console.log(body);

        let seq = this.api.postImage(body).then(
            (res) => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                if (res) {
                    console.log("Zip Uploaded");
                    console.log(res);
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, (err) => {
                console.error('ERROR', err);
            });

        return seq;
    }

    getTaskStatus() {
        console.log("service/getTaskStatus");

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            toolkit: this._toolkit,
            taskID: this._taskID,
            mode: "check",
            task_mode: this.task_mode
        }

        let seq = this.api.get('task', body).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                if (res.message) {
                    console.log("status: " + res.message);
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, err => {
                console.error('ERROR', err);
            });
        return seq;
    }

    getAnalysedImages(toolkit: any) {
        console.log("service/getAnalysedImage");
        this._toolkit = toolkit;

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            toolkit: toolkit,
            locationID: this.locationID,
            missionID: this.missionID,
            folder_type: "analysed_raw",
            option: "download"
        }

        let seq = this.api.get('data', body).share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                if (!res.body) {
                    this.saveAnalysedImages(res);
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, err => {
                console.error('ERROR', err);
            });
        return seq;
    }

    saveTask(resp) {
        this._taskID = resp.taskID.id;
    }

    saveAnalysedImages(resp) {
        this.initAnalysedImage();
        for (let i = 0; i < resp.length; i++) {
            this._analyzedImage = resp;
            this._images.push(this._analyzedImage[i].image);
            //console.log("Image " + i + " :");
            //console.log("missionID" + this._analyzedImage[i].missionID);
            //console.log("image" + this._analyzedImage[i].image);
            //console.log("jsonName" + this._analyzedImage[i].jsonName);
            //console.log("json" + this._analyzedImage[i].json);
            //console.log("imageName" + this._analyzedImage[i].imageName);
            //console.log("locationID" + this._analyzedImage[i].locationID);
            //console.log("date" + this._analyzedImage[i].date);
        }
    }

    initAnalysedImage() {
        this._images = [];
        this._analyzedImage = [{
            "missionID": "",
            "image": "",
            "jsonName": "",
            "json": "",
            "imageName": "",
            "locationID": "",
            "date": ""
        }];
    }
}