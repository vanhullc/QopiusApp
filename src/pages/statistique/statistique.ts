import { Component, ViewChild, ElementRef } from '@angular/core';
import { MenuController, NavController, PopoverController } from 'ionic-angular';

import { ReportPage } from '../report/report';
import { HomePage } from '../home/home';
import { LocationListPage } from '../locationList/locationList';

import { Analytics } from '../../services/analytics';
import { Missions } from '../../services/missions';
import { Locations } from '../../services/locations';
import { Labels } from '../../services/labels';
import { User } from '../../services/user';

import Chart from 'chart.js';

@Component({
    templateUrl: 'statistique.html',
    selector: './page-statistique'
})

export class StatistiquePage {

    @ViewChild('popoverContent', { read: ElementRef }) content: ElementRef;

    public doughnutChartLabels: string[] = ['Out of stock', 'Total products'];
    public outOfStockdoughnutChartLabels: string[] = ['Out of stock', 'Total products'];
    public shareOfShelfdoughnutChartLabels: string[] = ['', ''];
    public planogramCompliancedoughnutChartLabels: string[] = ['', ''];
    public doughnutChartData: number[] = [90, 10];
    public doughnutChartType: string = 'doughnut';
    public doughnutChartOptions: any = {
        cutoutPercentage: 85,
        legend: {
            display: false
        }
    };
    public outOfStockDoughnutChartColors: any = [{ backgroundColor: ["#CE0350", "#DBDBDB"] }];
    public planogramComplianceDoughnutChartColors: any = [{ backgroundColor: ["#114486", "#DBDBDB"] }];
    public shareOfShelfDoughnutChartColors: any = [{ backgroundColor: ["#335133", "#DBDBDB"] }];

    locations: any;
    locationNames: any;
    locationID: any;
    labels: any;
    missions: any;
    missionID: string;
    toolkitID: string;
    analytics: any;
    outOfStockPercentage: number;
    outOfStockdoughnutChartData: number[];
    shareOfShelfPercentage: number;
    shareOfShelfdoughnutChartData: number[];
    planogramCompliancePercentage: number;
    planogramCompliancedoughnutChartData: number[];
    currentLocationList: any;
    currentStartDate: string;
    currentEndDate: string;

    constructor(private menu: MenuController, private nav: NavController, private userService: User, 
        private analyticsService: Analytics, private missionService: Missions, private locationService: Locations, 
        private labelService: Labels, private popoverCtrl: PopoverController) {
        this.menu.enable(true);
        this.locationID = "Es4bGvNFPL";
        this.toolkitID = "y6W4gm";
    }

    ngOnInit() {
        console.log("statistiquesPage/ngOnInit");
        this.locationService.getAllLocations()
            .subscribe(res => {
                this.locations = res.json();
                // all locations selected
                this.currentLocationList = this.locations;

                this.getLocationLabels();
                this.switchLocation();

                this.missionService.getAllMissions()
                    .subscribe(res => {
                        this.missions = res.json();

                        console.log('--> missions', this.missions);

                        /**
                         * Define missionID
                         */
                        this.missionID = Object.keys(this.missions['ongoing'])[0];

                        console.log('--> mission id is', this.missionID);

                        this.labelService.getAllLabels()
                            .subscribe(res => {
                                this.labels = res.json();

                                console.log('--> labels', this.labels);
                                this.fetchAnalytics();
                            }
                            );
                    });
            }, err => {
                this.nav.setRoot(HomePage)
            });
    }

    locationSelected(location) {
        console.log('--> location', location);

        this.currentLocationList = location;

        /**
         * Store location in localStorage so User doesn't have to type it down again
         * localStorage.setItem('qopius_dashboard_location', JSON.stringify(location));
         */

        if (this.currentLocationList.length > 0) {
            this.fetchAnalytics()
        }
        else {
            this.analytics = null;
        }
    }

    fetchAnalytics() {
        console.log("statistiquesPage/fetchAnalytics");
        this.analyticsService.getAnalytics(this.locationID,
            this.toolkitID,
            this.missionID,
            this.currentStartDate,
            this.currentEndDate)
            .subscribe(res => {
                this.analytics = res.json();

                let outOfStock = 0;
                let facings = 0;
                let productShareOfShelf = 0;
                let planogramCompliance = 0;
                const location = this.currentLocationList;

                outOfStock = this.analytics['analytics']['root_label']['o'];
                facings = this.analytics['analytics']['root_label']['f'];
                productShareOfShelf = this.analytics['analytics']['root_label']['p'];
                planogramCompliance = this.analytics['analytics']['root_label']['r'];
                /* Ready when multiple selection would be possible
                if (location.length === 1) {
                    outOfStock = this.analytics['analytics']['root_label']['o'];
                    facings = this.analytics['analytics']['root_label']['f'];
                    productShareOfShelf = this.analytics['analytics']['root_label']['p'];
                    planogramCompliance = this.analytics['analytics']['root_label']['r'];

                }
                else if (location.length === 2) {
                    outOfStock = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['o'];
                    facings = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['f'];
                    productShareOfShelf = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['p'];
                    planogramCompliance = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['r'];
                }
                else if (location.length === 3) {
                    outOfStock = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['_c'][location[2]['id']]['o'];
                    facings = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['_c'][location[2]['id']]['f'];
                    productShareOfShelf = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['_c'][location[2]['id']]['p'];
                    planogramCompliance = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['_c'][location[2]['id']]['r'];
                }
                else if (location.length === 4) {
                    outOfStock = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['_c'][location[2]['id']]['_c'][location[3]['id']]['o'];
                    facings = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['_c'][location[2]['id']]['_c'][location[3]['id']]['f'];
                    productShareOfShelf = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['_c'][location[2]['id']]['_c'][location[3]['id']]['p'];
                    planogramCompliance = this.analytics['analytics']['root_label']['_c'][location[1]['id']]['_c'][location[2]['id']]['_c'][location[3]['id']]['r'];
                }*/

                this.outOfStockdoughnutChartData = [outOfStock, outOfStock + facings];
                this.outOfStockPercentage = Math.floor(outOfStock / (outOfStock + facings) * 100);

                this.shareOfShelfdoughnutChartData = [productShareOfShelf * 100, 100 - (productShareOfShelf * 100)];
                this.shareOfShelfPercentage = Math.floor(productShareOfShelf * 100);

                this.planogramCompliancedoughnutChartData = [planogramCompliance * 100, 100 - (planogramCompliance * 100)];
                this.planogramCompliancePercentage = Math.floor(planogramCompliance * 100);
            }
        );
    }

    

    getLocationLabels() {
        this.locationNames = [];

        const storeLocations = this.locations[Object.keys(this.locations)[0]]['children'];
        const storeLocationsArray = Object.keys(storeLocations).map(function (key) { return storeLocations[key]; });
        for (let i = 0; i < storeLocationsArray.length; i++) {
          const storeLocation = storeLocationsArray[i];
          const name = storeLocation['name'];
          /**
           * Push new locations to array
           */
          this.locationNames.push({id: Object.keys(storeLocations)[i], title: name});

          if (storeLocation['children']) {
            for (let j = 0; j < Object.keys(storeLocation['children']).length; j++) {
                const childLocationId = Object.keys(storeLocation['children'])[j];
                const childLocation = storeLocation['children'][childLocationId];

                this.locationNames.push({id: childLocationId, title: childLocation['name']});
            }
          }
      }
    }

    switchLocation() {
        let popover = this.popoverCtrl.create(LocationListPage, {
            locationList: this.locationNames,
            locations: this.locations
        });
        popover.present();
    }

    toggleMenu() {
        console.log("home/toggleMenu");
        this.menu.toggle();
    }

    openReportPage() {
        this.nav.push(ReportPage);
    }
}