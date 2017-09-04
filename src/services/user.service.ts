import { Injectable } from '@angular/core';

import { qopiusUser } from '../models/qopiusUser';

import { ApiService } from '../services/api.service';

import { Http } from '@angular/http';

import 'rxjs/Rx';


@Injectable()

export class UserService {
  _user: qopiusUser;


  constructor(
    public http: Http,
    public api: ApiService
    ) {
      this.http = http;
      this.api = api;
  }

  //******************************************************************************
  //LOGIN****************************************************************
  //******************************************************************************
  login(account: any) {
    console.log("service/login");

    let body = {
      name: account.username,
      password: account.password
    };
    console.log(body);
    let seq = this.api.post('session', body).share();

    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        // Success if user info returned. Else error.
        if (!res.error) {
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
  private _loggedIn(resp) {
    this.initUser();
    this._user = resp;
    console.log("toolkits :" + this._user.toolkits.toString());
    console.log("rights :" + this._user.rights);
    console.log("companyID :" + this._user.companyID);
    console.log("companyName :" + this._user.companyName);
    console.log("session_password :" + this._user.session_password);
    console.log("accountID :" + this._user.accountID);
  }

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
