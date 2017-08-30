import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';


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

    let options :FileUploadOptions = {
      fileKey: "file",
      fileName: body.taskID + ".zip",
      mimeType: "application/zip",
      httpMethod: "POST",
      /*params: {
        accountID: body.accountID,
        session_password: body.session_password,
        toolkitID: body.toolkitID,
        taskID: body.taskID,
        mode: body.mode,
        file: body.file
      }*/
    }

    let url = this.postImageUrl + "?accountID=" + body.accountID + "&session_password=" + body.session_password + "&toolkitID=" + body.toolkitID + "&taskID=" + body.taskID + "&mode=" + body.mode;

    console.log("api/postImage");
    return this.fileTransfer.upload(body.file, url, options, true);
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
