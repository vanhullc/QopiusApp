import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Component } from '@angular/core';

import { Image } from '../../services/image';

import { ImageDetailPage } from '../imageDetail/imageDetail';
import { CameraPage } from '../camera/camera';

@Component({
    templateUrl: 'canvas.html',
    selector: 'page-canvas'
})

/* 
   This page is used to show the pics stored in the server.
*/

export class CanvasPage {
    _toolkit: any;
    _images: String[];
    _boxesJSon: any;

    constructor(private menu: MenuController, private nav: NavController, private navParam: NavParams, private imageService: Image) {
        console.log("canvas.ts/Constructor");
        this._toolkit = "y6W4gm";
        console.log("toolkit: " + this._toolkit);
        this.imageService.getAnalysedImages(this._toolkit).subscribe(
            ()=> {
                this._images = this.imageService._images;
            }
        );
    }

    // Open a zoom that allow the user to see the picture correctly. 

    openPhoto(index: any) {
        console.log("imageDetail/initializeBoxes/urlBoxes : "+ this._images[index]);
        this.nav.push(ImageDetailPage, {photo_index: index, boxesJSon: this._boxesJSon});
    }

    // Open the cameraPage to add new pics to the toolkit

    openCamera() {
        this.nav.push(CameraPage);
    }

    toggleMenu() {
        console.log("home/toggleMenu");
        this.menu.toggle();
    }
}
