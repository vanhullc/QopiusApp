import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalysedImage } from '../models/analysedImage';

import { Api } from '../services/api';
import { User } from '../services/user';

import { Http } from '@angular/http';

import 'rxjs/Rx';


@Injectable()

export class Image {
    _image: AnalysedImage[];
    locationID: string = "skip";
    missionID: string = "skip";


    constructor(public http: Http, public api: Api, public user: User) {
        this.http = http;
        this.api = api;
        this.user = user;
    }

    getAnalysedImage(toolkit: any) {
        console.log("service/getAnalysedImage");

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
                    this._saveAnalysedImage(res);
                }
                else {
                    console.error("API error when trying to connect", res);
                }

            }, err => {
                console.error('ERROR', err);
            });

        return seq;
    }

    _saveAnalysedImage(resp) {
        this.initAnalysedImage();
        for(let i = 0; i < resp.length ; i++) {
            this._image = resp;
            console.log("Image " + i + " :");
            console.log("missionID" + this._image[i].missionID);
            console.log("image" + this._image[i].image);
            console.log("jsonName" + this._image[i].jsonName);
            console.log("json" + this._image[i].json);
            console.log("imageName" + this._image[i].imageName);
            console.log("locationID" + this._image[i].locationID);
            console.log("date" + this._image[i].date);
        }
    }

    initAnalysedImage() {
        this._image = [{
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