import { Injectable, EventEmitter } from '@angular/core';

import { File } from '@ionic-native/file';

import { Base64 } from '@ionic-native/base64';
import JSzip from 'jszip';

@Injectable()
export class ZipService {
    private _zip: JSzip;
    private _index: number;
    private _files: string[];
    private _length: number;
    private _memoryDirectory = this.file.externalCacheDirectory;
    private _eventIssue: string[];

    public endEvent = new EventEmitter();

    constructor(
        private base64: Base64,
        private file: File
    ) { }

    public createZip(files: string[]) {
        this._zip = new JSzip();
        this._index = 0;
        this._files = files;
        this._length = files.length;
        this._eventIssue = [];
        this.addStringToBase64();
    }

    private addStringToBase64() {
        this.base64.encodeFile(this._files[this._index]).then(
            (base64File: string) => {
                /* 
                   Hack of the base64 header, it shouldn't be in the zip.file function
                   Header can be different from one pic to another, depending the source
                   We look for the end of the header, "base64", and we delete all the header from the base64 file
                */
                let indexBase64 = base64File.indexOf("base64");
                console.log(indexBase64);
                this._zip.file(this._index + ".jpg", base64File.substr(indexBase64 + 7), {base64: true});
                this._index++;
                console.log("addStringToBase64/addBase64 sucess");
                console.log(this._length + " & " + this._length);
                if (this._index < this._length) {
                    this.addStringToBase64();
                }
                else {
                    this.generateZip();
                }
            }, (err) => {
                this._eventIssue.push("failure");
                this.endEvent.emit(this._eventIssue);
                console.log(err);
            });
    }

    private generateZip() {
        this._zip.generateAsync({ "type": "blob" }).then(
            (content) => {
                this.saveZip(content);
            },
            (err) => {
                this._eventIssue.push("failure");
                this.endEvent.emit(this._eventIssue);
                console.log(err);
            }
        );
    }

    private saveZip(content) {
        this.file.createFile(this._memoryDirectory, "Images.zip", true).then(
            (res) => {
                console.log("file created" + (JSON.stringify(res)));
                this.file.writeExistingFile(this._memoryDirectory, "Images.zip", content).then(
                    (res) => {
                        console.log("zip file writed" + (JSON.stringify(res)));
                        this.endEvent.emit({
                            sucess: true, 
                            path: this._memoryDirectory + "Images.zip"
                        });
                    }, (err) => {
                        this.endEvent.emit({
                            sucess: false
                        });
                    });
            }, (err) => {
                this._eventIssue.push("failure");
                this.endEvent.emit(this._eventIssue);
            }
        );
    }




}