import {IonicApp, ViewController, Alert, MenuController, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {HomePage} from '../home/home';
import {UserService} from '../../services/userServices';
import {qopiusUser} from '../../models/qopiusUser';
import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: 'authentication.html'
})

export class AuthenticationPage {

    constructor( private app: IonicApp, private nav: NavController, private viewController: ViewController, private menuController: MenuController, private userService: UserService ) {

    }

    onPageLoaded(){
        this.menuController.enable(false);
        this.viewController.showBackButton(false);
    }

    emailValidForm(  ) {

    }

    login( event ) {

    }

    successPopup( nav: any ){

    }

    errorPopup(messageToDisplay: Observable<string>, nav: any){

    }

    onPageWillLeave() {
    }
}
