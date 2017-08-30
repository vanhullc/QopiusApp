import { Injectable } from '@angular/core';

import { AnalysedImage } from '../models/analysedImage';
import { Box } from '../models/qopiusBox';

import { FileUploadResult } from '@ionic-native/file-transfer';

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
        this._toolkit = "y6W4gm";
    }



    getTask() {// Get taskID. Used to post image for example
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


    postTask() {// post taskID. Used after getTask to post image for example
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



    uploadImage(zipFile: String) {// Prepare all the request parameter for the api/postImage function. Return the promise to the camera page to handle the response. 
        console.log("service/uploadImage");

        let body = {
            accountID: this.user._user.accountID,
            session_password: this.user._user.session_password,
            toolkitID: this._toolkit,
            taskID: this._taskID,
            mode: "zip",
            file: zipFile
        };

        console.log(body);

        let seq: Promise<FileUploadResult> = this.api.postImage(body);/*.then(
            (res) => {
                if (res.responseCode) {
                    console.log("Zip Uploaded");
                    console.log(res);
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, (err) => {
                console.error('ERROR', err);
            });*/

        return seq;
    }

    getTaskStatus() {// Get taskStatus. Not used RN
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

    getAnalysedImages(toolkit: any) {// Get analysed image linked to the toolkit. Allow to get pics and boxes. Save this pics
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

    getAnalysedImageByName(imageName: any, boxID: number[]) {// Get image linked to the alert.
        // WARNING string comparaison is wheter the imageName is INCLUDED in the analyzedImage row, not strictly similar. 
        console.log("service/getImage");
        var analysedImage: AnalysedImage;
        for (let i = 0; i < this._analyzedImage.length; i++) {
            console.log(this._analyzedImage[i].imageName + " === " + imageName)
            if (this._analyzedImage[i].imageName === imageName) {
                analysedImage = {
                    "missionID": this._analyzedImage[i].missionID,
                    "image": this._analyzedImage[i].image,
                    "jsonName": this._analyzedImage[i].jsonName,
                    "json": this._analyzedImage[i].json,
                    "imageName": this._analyzedImage[i].imageName,
                    "locationID": this._analyzedImage[i].locationID,
                    "date": this._analyzedImage[i].date,
                    "boxes": this._analyzedImage[i].boxes
                };
                analysedImage.boxes = [];
                console.log(this._analyzedImage[i].boxes[0]);
                if (boxID[0]) {
                    for (let j = 0; j < boxID.length; j++) {
                        analysedImage.boxes.push(this._analyzedImage[i].boxes[boxID[j]]);
                    }
                }
                return analysedImage;
            }
        }
    }

    saveTask(resp) {
        this._taskID = resp.taskID.id;
    }

    saveAnalysedImages(resp) {// Save analysedImage in _analyzedImage and all the images link in _images
        console.log("service/saveAnalysedImage");
        this.initAnalysedImage();
        for (let i = 0; i < resp.length; i++) {
            this._analyzedImage = resp;
            this._images.push(this._analyzedImage[i].image);
            this.getBoxes(i);
        }
    }

    getBoxes(index: any) {
        console.log("service/getBoxes");
        this.api.getUrl(this._analyzedImage[index].json.toString())
            .map(res => res.json())
            .subscribe(
            res => {
                this._analyzedImage[index].boxes = res.results;
            }, err => {
                console.error("ERROR" + JSON.stringify(err));
            }
            );
    }

    initAnalysedImage() {// Default position of _images and _analyzedImages
        this._images = [];
        this._analyzedImage = [{
            "missionID": "",
            "image": "",
            "jsonName": "",
            "json": "",
            "imageName": "",
            "locationID": "",
            "date": "",
            "boxes": []
        }];
    }
}