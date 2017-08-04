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
    
    chartLabels: string[] = ['Out of stock'];
    chartType: string = 'doughnut';
    chartLegend: boolean = false;
    
    chartData: any[] = [
        { data: [8, 92], label: 'target <5%' },
    ];

    chartBarOptions: any = {
        borderSkipped: 'left',
        responsive: true
    };
    
    chartBarLabels: string[] = ['City 11e', 'Market 20e', 'Express 19e', 'City Voltaire', 'Super ding', 'Express 16e'];
    chartBarType: string = 'horizontalBar';
    chartBarLegend: boolean = false;
    
    chartBarData: any[] = [
        { data: [8, 10, 11, 14, 15, 17]},
    ];

    chartBar2Options: any = {
        borderSkipped: 'left',
        responsive: true
    };
    
    chartBar2Labels: string[] = ['City 11e', 'Market 20e', 'Express 19e', 'City Voltaire', 'Super ding', 'Express 16e'];
    chartBar2Type: string = 'bar';
    chartBar2Legend: boolean = false;
    
    chartBar2Data: any[] = [
        { data: [8, 10, 11, 14, 15, 17]},
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