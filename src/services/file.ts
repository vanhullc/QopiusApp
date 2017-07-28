import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AnalysedImage } from '../models/analysedImage';

import { Http } from '@angular/http';

import JSzip from 'JSzip';

import 'rxjs/Rx';


@Injectable()

export class FileService {
    zip: any;
    constructor(private jszip: JSzip) {
        this.zip = new jszip();
    }

    zipPics(files: any[]){
        for(let i = 0; i < files.length; i++) {
            this.zip.files(files[i]);   
        }
        return this.zip.generateAsync({type:"blob"});
    }

}