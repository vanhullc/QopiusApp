import { Component, ViewChild } from '@angular/core';
import { MenuController } from 'ionic-angular';

import Chart from 'chart.js';

@Component({
    templateUrl: 'statistique.html'
})

export class StatistiquePage {

    chartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    
    chartLabels: string[] = ['Out of stock', ''];
    chartType: string = 'pie';
    chartLegend: boolean = true;
    
    chartData: any[] = [
        { data: [8, 92], label: 'target <5%' },
    ];

    constructor(private menu: MenuController) {
        this.menu.enable(true);
        this.initialise();
    }

    initialise() {
        
    }
    
    toggleMenu() {
        console.log("home/toggleMenu");
        this.menu.toggle();
    }
}