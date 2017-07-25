import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ErrorService} from './errorServices';
import {qopiusUser} from '../models/qopiusUser';
import {RestMessage} from '../models/restMessage';
import { Http } from '@angular/http';

import 'rxjs/Rx';

let favorites = [],
    domain = "http://apiqube.com/debug",
    loginURL = domain + "/session",
    disconnectURL = domain + "/mobileApp/MobileAppUserCross/disconnect"

@Injectable()

export class UserService {
  loggedUser: qopiusUser;
  http: Http;
  errorService: ErrorService;
  private _loggerHeader = "error in userServices";

  constructor ( http: Http, errorService: ErrorService ) {
    this.http = http;
    this.errorService = errorService;
  }

  init(){
    this.initUser();
  }

  //******************************************************************************
  //REST CALLS********************************************************************
  //******************************************************************************
  callLogin( name: string, password: string ) {
    console.log("callLogin");
    let loggerMethod: string = ".callLogin";
    let body = {

    }
    let headers = new Headers({
      'Content-Type': 'application/form-data'
    });
    let options:any = ({
      headers: headers
    });
    let loginURLUser = loginURL + "?name=" + name + "&password=" + password;
    return this.http.post( loginURLUser, body)
        .map( res => res.json() )
        .catch( this.errorService.handleCallError );
  }

  //******************************************************************************
  //PUBLIC METHODS****************************************************************
  //******************************************************************************
  login( name: string, password: string, successCallback: ( nav: any ) => void, errorCallback: ( errorMessage: Observable<string>, nav: any ) => void, component:any ) {
    console.log("login");
    let loggerMethod: string = ".login";
    let restMessage: RestMessage;
    this.callLogin(name, password).subscribe(
      //observable.next
      data => {
        restMessage = data;
      },
      //observable.error
      error => {
        errorCallback( this.errorService.handleSubscribeError( error, this._loggerHeader + loggerMethod), component );
      },
      //observable.complete
      () => {
        if(restMessage.status == "success") {
            this.loggedUser = restMessage.singleResult;
            successCallback(component);
        }else if ( restMessage.status == "failure" ){
          errorCallback( this.errorService.handleRestMessageError( restMessage.errors, this._loggerHeader + loggerMethod), component );
        }else{
          let errorMessage = "restMessageStatus undefinied: bad request";
          console.error( this._loggerHeader + loggerMethod + errorMessage);
          errorCallback( this.errorService.handleUndefinedRestMessageError( this._loggerHeader + loggerMethod), component );
        }
    }
    );
  }


  //******************************************************************************
  //ERRORS HANDLING***************************************************************
  //******************************************************************************

  //******************************************************************************
  //PRIVATE METHODS***************************************************************
  //******************************************************************************
  private initUser() {
    this.loggedUser = {
      "toolkits": [],
      "rights": "",
      "companyID": "",
      "companyName": "",
      "session_password": "",
      "accountID": ""
    };
  }
}
