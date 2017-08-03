import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';


/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://apiqube.com/debug';
  postImageUrl: string = "http://train2.qopius.com:8000/upload";
  fileTransfer: FileTransferObject = this.transfer.create();


  constructor(public http: Http, private transfer: FileTransfer) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint, options);
  }

  // Get without 'https://apiqube.com/debug' URL

  getUrl(endpoint: string) {
    return this.http.get(endpoint);
  }

  //Specific function because of different URL and function usage.

  postImage(body: any) {

    let options: any;
    
    options.params = {};
    options.params.accountID = body.accountID;
    options.params.session_password = body.session_password;
    options.params.toolkitID = body._toolkit;
    options.params.taskID = body._taskID;
    options.params.mode = body.mode;
    options.params.file = body.file;

    console.log("api/postImage");
    return this.fileTransfer.upload(body.file, this.postImageUrl, options, true);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.post(this.url + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
