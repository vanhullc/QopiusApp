import { Box } from './qopiusBox';

export class AnalysedImage {
    missionID: String;
    image: String;
    jsonName: String;
    json: String;
    imageName: String;
    locationID: String;
    date: String;
    boxes: Box[];

    constructor(missionID: any, image: String, jsonName: String, json: String, imageName: String, locationID: String, date: String) {
        this.missionID = missionID;
        this.image = image ;
        this.jsonName = jsonName ;
        this.json = json ;
        this.imageName = imageName ;
        this.locationID = locationID ;
        this.date = date ;
        this.boxes = [];
    }
}