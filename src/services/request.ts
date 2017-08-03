import { Injectable } from '@angular/core';

import { Request } from '../models/request';


@Injectable()

export class RequestService { 
    private listRequest: Request[];
    private listRequestArchived: Request[];

    constructor() {
        this.initialise();
    }

    initialise() {
        console.log("requestService/initialise");
        this.listRequest = [];
        this.listRequestArchived = []
        let req: Request = new Request(1, "Coca cola zero", "Soda", new Date(2017, 7, 2), "Out of stock", []);
        this.listRequest.push(req);
        req = new Request(2, "Fanta Light", "Soda", new Date(2017, 4, 7), "Price tag missing", []);
        this.listRequest.push(req);
        req = new Request(3, "Coca cola zero", "Soda", new Date(2017, 3, 7), "Out of stock", []);
        this.listRequest.push(req);
    }

    getListRequest() {
        console.log("requestService/getListRequest");
        return this.listRequest;
    }

    getListArchivedRequest() {
        console.log("requestService/getListArchivedRequest");
        return this.listRequestArchived;
    }

    remove(request: Request) {
        console.log("requestService/remove requestId: " + request.id);
        let listRequestFiltered: Request[] = [];
        for(let i = 0; i < this.listRequest.length; i++) {
            if(this.listRequest[i] != request) {
                listRequestFiltered.push(this.listRequest[i]);
            }
            else {
                this.listRequestArchived.push(this.listRequest[i]);
            }
        }
        this.listRequest = listRequestFiltered;
    }

    filterRequestByType(filterRequest: String) {
        console.log("requestService/filterrequestByType");
        let listRequestFiltered: Request[] = [];
        for(let i = 0; i < this.listRequest.length; i++) {
            if(this.listRequest[i].type === filterRequest) {
                listRequestFiltered.push(this.listRequest[i]);
            }
        }
        return listRequestFiltered;
    }

    filterRequestByProduct(filterRequest: String) {
        console.log("requestService/filterrequestByProduct");
        let listRequestFiltered: Request[] = [];;
        for(let i = 0; i < this.listRequest.length; i++) {
            if(this.listRequest[i].product === filterRequest) {
                listRequestFiltered.push(this.listRequest[i]);
            }
        }
        return listRequestFiltered;
    }

    filterRequestByDate(filterRequest: Date) {
        console.log("requestService/filterRequestByDate");
        let listRequestFiltered: Request[] = [];
        for(let i = 0; i < this.listRequest.length; i++) {
            if(this.listRequest[i].date.getDate() === filterRequest.getDate() && 
               this.listRequest[i].date.getMonth() === filterRequest.getMonth() && 
               this.listRequest[i].date.getFullYear() === filterRequest.getFullYear()) {
                listRequestFiltered.push(this.listRequest[i]);
            }
        }
        return listRequestFiltered;
    }

    filterRequestInferiorDate(filterRequest: Date) {
        console.log("requestService/filterRequestInferiorDate");
        let listRequestFiltered: Request[] = [];
        for(let i = 0; i < this.listRequest.length; i++) {
            if(this.listRequest[i].date.getTime() >= filterRequest.getTime()) {
                listRequestFiltered.push(this.listRequest[i]);
            }
        }
        return listRequestFiltered;
    }
}