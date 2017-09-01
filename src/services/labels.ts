import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { User } from './user';
@Injectable()
export class Labels {
    getLabelsUrl = 'https://apiqube.com/debug/label';

    constructor(private http: Http, private user: User) { }

    getAllLabels() {
        const accountId = this.user._user.accountID;
        const sessionPwd = this.user._user.session_password;

        let seq = this.http.get(this.getLabelsUrl +
            '?accountID=' + accountId +
            '&session_password=' + sessionPwd)
            .share();

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                console.log("API getLabels sucess");

            }, err => {
                console.error('ERROR', err);
            });

        return seq;
    }
}
