import { ToastController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { HomePage } from '../home/home';

import { UserService } from '../../services/user.service';

@Component({
  templateUrl: 'authentication.html',
  selector: 'page-authentication'
})

/* 
* This page is used to authenticate the user.
*/

export class AuthenticationPage {

  image: any;

  // Variable linked to the form

  account: { username: string, password: string } = {
    username: 'Cyrille',
    password: 'xlYlkeRCH4'
  };

  private loginErrorString: "Login error";

  constructor(
    public toastCtrl: ToastController,
    public nav: NavController,
    public userService: UserService
    ) {
    this.image = "C:\Users\cyril\Documents\Stage_QOPIUS\QopiusApp\resources\logo.png";
  }

  // Function linked to the submit button of the form.

  login(event) {
    this.userService.login(this.account).subscribe(
      (resp) => {
        this.nav.setRoot(HomePage);
      }, (err) => {
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });

  }

  onPageWillLeave() {
  }
}
