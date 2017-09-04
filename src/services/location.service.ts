import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { UserService } from './user.service';

import { Location } from '../models/location';

@Injectable()
export class LocationService {
  private _getLocationsUrl = 'https://apiqube.com/debug/location';
  private _locationID;
  private _locations: Location[];

  constructor(
    private http: Http,
    private user: UserService) {
    this._locationID = "Es4bGvNFPL";
  }

  public getLocationID() {
    return this._locationID;
  }

  public getAllLocations() {
    const accountId = this.user._user.accountID;
    const sessionPwd = this.user._user.session_password;

    let seq = this.http.get(this._getLocationsUrl + '?accountID=' + accountId + '&session_password=' + sessionPwd)
      .share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        // Success if user info returned. Else error.
        console.log("API getLocation sucess");
        this._locations = []        
        this.setLocation(Object.keys(res[Object.keys(res)[0]]['children']).map(function (key) { return this._locations[key];}), []);

      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }
/*
  private setLocation(locations: any[], parentsID: string[]) {
    for (let i = 0; i < locations.length; i++) {
      if(locations['children']) {
        parentsID.push(locations[i])
        this.setLocation(locations['children'], parentsID)
      }
    }
  }

  public getLocationName(locationID: string) {
    for (let i = 0; i < this._locations.length; i++) {
      console.log(this._locations[i].name);
      if(this._locations[i] === locationID) {
        return this._locations[i].name;
      }
      else if (this._locations[i].children) {
        for (let j = 0; j < this._locations[i].children.length; j++) {
          console.log(this._locations[i].name);
          if(this._locations[i].children === locationID) {
            return this._locations[i].children.name;
          }
        }
      }
    }
  }
  */
}