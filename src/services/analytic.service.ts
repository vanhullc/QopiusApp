import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import { UserService } from './user.service';
import { ApiService } from './api.service';

@Injectable()
export class AnalyticService {
    getAnalyticsUrl = 'https://apiqube.com/debug/analytics';

    constructor(private api: ApiService,
         private http: Http,
          private user: UserService
        ) { }

    getAnalytics(locationId: string, toolkitId: string, missionId: string, startDate?: string, endDate?: string) {
        const accountId = this.user._user.accountID;
        const sessionPwd = this.user._user.session_password;

        let urlToGet = '';

        if (startDate && endDate) {
            urlToGet = this.getAnalyticsUrl +
                '?accountID=' + accountId +
                '&session_password=' + sessionPwd +
                '&toolkit=' + toolkitId +
                '&locationID=' + locationId +
                '&fromDate=' + startDate +
                '&toDate=' + endDate +
                '&missionID=' + missionId + '&timeSlot=skip&mode=get_json&status=checked';
        }
        else if (startDate) {
            urlToGet = this.getAnalyticsUrl +
                '?accountID=' + accountId +
                '&session_password=' + sessionPwd +
                '&toolkit=' + toolkitId +
                '&locationID=' + locationId +
                '&fromDate=' + startDate +
                '&missionID=' + missionId + '&timeSlot=skip&mode=get_json&status=checked';
        }
        else if (endDate) {
            urlToGet = this.getAnalyticsUrl +
                '?accountID=' + accountId +
                '&session_password=' + sessionPwd +
                '&toolkit=' + toolkitId +
                '&locationID=' + locationId +
                '&toDate=' + endDate +
                '&missionID=' + missionId + '&timeSlot=skip&mode=get_json&status=checked';
        }
        else {
            urlToGet = this.getAnalyticsUrl +
                '?accountID=' + accountId +
                '&session_password=' + sessionPwd +
                '&toolkit=' + toolkitId +
                '&locationID=' + locationId +
                '&missionID=' + missionId + '&timeSlot=skip&mode=get_json&status=checked';
        }

        console.log('url to get', urlToGet);

        let seq = this.api.get(urlToGet).share()

        seq
            .map(res => res.json())
            .subscribe(res => {
                // If the API returned a successful response, mark the user as logged in
                // Success if user info returned. Else error.
                console.log("API getAnalytics sucess");

            }, err => {
                console.error('ERROR', err);
            });

        return seq;

    }

}