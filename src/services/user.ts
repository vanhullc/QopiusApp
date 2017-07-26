import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {qopiusUser} from '../models/qopiusUser';

import { Api } from '../services/api';

import { Http } from '@angular/http';

import 'rxjs/Rx';


@Injectable()

export class User {
  _user: qopiusUser;


  constructor (public http: Http, public api: Api) {
    this.http = http;
    this.api = api;
  }

  //******************************************************************************
  //PUBLIC METHODS****************************************************************
  //******************************************************************************
  login( account:any) {
    console.log("login");

    let body = {
      name : account.username,
      password : account.password
    };
    console.log(body);
    let seq = this.api.post('session', body).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        // Success if user info returned. Else error.
        if(res.toolkits) {
          this._loggedIn(res);
        }
        else {
          console.error("API error when trying to connect", res);
        }

      }, err => {
        console.error('ERROR', err);
      });

    return seq;
  }

  logout() {
    this._user = null;
  }

  /**
   * Process a login/signup response to store user data
   * Response JSON is user information
   */
  _loggedIn(resp) {
    this.initUser();
    this._user = resp;
    console.log("toolkits :" + this._user.toolkits.toString());
    console.log("rights :" + this._user.rights);
    console.log("companyID :" + this._user.companyID);
    console.log("companyName :" + this._user.companyName);
    console.log("session_password :" + this._user.session_password);
    console.log("accountID :" + this._user.accountID);
  }

  //******************************************************************************
  //PRIVATE METHODS***************************************************************
  //******************************************************************************
  private initUser() {
    this._user = {
      "toolkits": [],
      "rights": "",
      "companyID": "",
      "companyName": "",
      "session_password": "",
      "accountID": ""
    };
  }
}
