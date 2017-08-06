import { Component, ViewChild } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';

import { ReportPage } from '../report/report';

import Chart from 'chart.js';

@Component({
    templateUrl: 'statistique.html'
})

export class StatistiquePage {

    public doughnutChartLabels: string[] = ['Out of stock', 'In stock'];
    public doughnutChartData: number[] = [90, 10];
    public doughnutChartType: string = 'doughnut';
    public doughnutChartOptions: any = {
        cutoutPercentage: 85,
        legend: {
            display: false
        }
    };
    public doughnutChartColors: any = [{
        backgroundColor: '#CE0350',
    },
    {
        backgroundColor: '#DBDBDB',
    }
    ];

    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            display: false
        }
    };
    public barChartLabels: string[] = ['City 11e', 'Market 20e', 'Express 19e', 'City Voltaire', 'Super cling', 'Express 16e'];
    public barChartType: string = 'horizontalBar';
    public barChartLegend: boolean = true;

    public barChartData: any[] = [
        { data: [65, 59, 80, 81, 56, 55], label: 'Out of stock ranking' }
    ];
    public barChartColors: any = [{
        backgroundColor: '#CE0350',
    },
    {
        backgroundColor: '#DBDBDB',
    }
    ];

    constructor(private menu: MenuController, private nav: NavController) {
        this.menu.enable(true);
        this.initialise();
    }

    initialise() {
        
    }
    
    toggleMenu() {
        console.log("home/toggleMenu");
        this.menu.toggle();
    }

    openReportPage() {
        this.nav.push(ReportPage);
    }
}