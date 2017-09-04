import { NavController, NavParams, Platform } from 'ionic-angular';
import { Component, ViewChild, ElementRef, Input } from '@angular/core';

import { AnalysedImage } from '../../models/analysedImage';
import { Box } from '../../models/qopiusBox';

import { Observable } from 'rxjs/Rx';
import { Subscription } from 'rxjs/Subscription';

import { ImageService } from '../../services/image.service';

@Component({
    templateUrl: 'imageDetail.html',
    selector: 'page-imageDetail'
})

export class ImageDetailPage {
    @ViewChild("bgimg") img: ElementRef;
    timer: Subscription;
    image: AnalysedImage;
    resolutionScale: number;
    visible: boolean = true;


    constructor(
        private platform: Platform,
        private navCtrl: NavController,
        private navParam: NavParams,
        private imageService: ImageService
    ) {
        console.log("imageDetailPage.ts/Constructor");
        this.initialise();
    }

    initialise() {
        console.log("imageDetailPage.ts/initialise");
        this.image = this.imageService._analyzedImage[this.navParam.get("photo_index")];
    }

     ngAfterViewInit() {
    // Perdiodically check for resolution change, and redraw boxes when needed
    // There may be some better, event based way to do this, but I haven't found any
    this.timer = Observable.interval(500).subscribe(()=> {
      let resolutionScale = this.img.nativeElement.height /
        this.img.nativeElement.naturalHeight;
      if (this.resolutionScale != resolutionScale) {
        this.resolutionScale = resolutionScale;
        this.visible = true;
      }
    });
  }


    getKeysArray() {
        if(this.image.boxes) {
             return Object.keys(this.image.boxes);
        }
        else {
            return false;
        }
       
    }

    drawBoxes(){  

    }

    edit(index: any) {
        //this.nav.push(editPage, {index: index, })
    }
    
    close() {
        this.navCtrl.pop();
    }
}
