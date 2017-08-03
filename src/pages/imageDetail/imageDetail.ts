import { NavController, NavParams } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

import { AnalysedImage } from '../../models/analysedImage';
import { Box } from '../../models/qopiusBox';

import { Image } from '../../services/image';

@Component({
    templateUrl: 'imageDetail.html',
    selector: 'page-imageDetail'
})

export class ImageDetailPage {
    @ViewChild('canvas') canvas;
    _image: String;
    _analysedImage: AnalysedImage[];
    _boxes: Box[];
    _index: any;
    resolutionScale: number;
    otherScale: number;
    visible: boolean = false;


    constructor(private nav: NavController, private navParam: NavParams, private imageService: Image) {
        console.log("imageDetailPage.ts/Constructor");
        this._index = this.navParam.get("photo_index");
        this._analysedImage = this.imageService._analyzedImage;
        this._boxes = [];
        this.initialise();
    }

    initialise() {
        this._image = this._analysedImage[this._index].image;
        //this.canvas.drawImage(this._image, 0,0);

        this._boxes = this._analysedImage[this._index].boxes;
        console.log("imageDetailPage.ts/initialise, box.x1: " + this._analysedImage[this._index].boxes.length);
    }

    edit(index: any) {
        //this.nav.push(editPage, {index: index, })
    }
    
    close() {
        this.nav.pop();
    }
}
