import { AnalysedImage } from './analysedImage';

export class Alert {
    id: number;
    missionId: String;
    text: String;
    company: String;
    date: Date;
    locationID: String;
    issues: String[];
    image: String;
    cancelOptions: String[];

    constructor(id: number, missionId: String, text: String, company: String, trigger_time: String, locationID: String, issues: String[]) {
        this.id = id;
        this.missionId = missionId;
        this.text = text;
        this.company = company;
        this.date = this.getDate(trigger_time);
        this.locationID = locationID;
        this.issues = issues;
        this.image = "https://s-media-cache-ak0.pinimg.com/originals/0e/18/03/0e18034419d03ffaec2b30ff712b7f75.jpg";
        this.cancelOptions = [];
    }

    getDate(time: any) {
        let date: Date;
        date = new Date();
        return date;
    }

    getIssue(i) {
        return this.issues[i];
    }
}