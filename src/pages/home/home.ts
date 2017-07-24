import {IonicApp, MenuController, NavController, AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {UserService} from '../../services/userServices';
import {AuthenticationPage} from '../authentication/authentication';

@Component({
  templateUrl: 'home.html'
})

export class HomePage {
    ownerName: string;

    constructor(private app: IonicApp, private nav: NavController, private menuController: MenuController, private userService: UserService, private alertCtrl: AlertController ) {
    }

    onPageLoaded(){
        this.menuController.enable(true);
        this.ownerName = this.userService.loggedUser.firstName + " " + this.userService.loggedUser.lastName;
    }

    onPageWillEnter() {
        /*to do just before the display of the page*/
    }
    onPageDidEnter(){}
    onPageWillLeave() {
    /*to do just before the page is leaved*/
    }
    onPageDidLeave() {}
    onPageWillUnload() {}
    onPageDidUnload() {}

    disconnect() {
        let successCallback = this.disconnectSucess;
        let errorCallback = this.errorPopup;
        let callbackComponent = this.nav;
        this.userService.disconnect(this.userService.loggedUser, successCallback, errorCallback, callbackComponent);
    }

    disconnectSucess(nav: any) {
        nav.setRoot(AuthenticationPage);
    }

    errorPopup(messageToDisplay: Observable<string>, nav: any){
        let message: string;
        messageToDisplay.subscribe(
            data => {
                message = data;
            },
            error => {
                //todo
            },
            () => {
                let alert = this.alertCtrl.create(
                    {
                        title: 'Disconnect Failed',
                        message: ''+ message,
                        buttons: [
                            {
                                text:'Ok',
                                handler: () => {
                                    //do nothing on complete
                                }
                            }
                        ]
                    }
                );
                nav.present(alert);
            }
        );
    }
}
