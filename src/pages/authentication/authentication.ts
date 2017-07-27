import { ToastController, NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { HomePage } from '../home/home';

import { User } from '../../services/user';

@Component({
  templateUrl: 'authentication.html'
})

export class AuthenticationPage {
  account: { username: string, password: string } = {
    username: 'Cyrille',
    password: 'xlYlkeRCH4'
  };

  private loginErrorString: "Login error"

  constructor(public toastCtrl: ToastController, public nav: NavController, public userService: User) {

  }

  onPageLoaded() {
    console.log("pageAuthLoaded");
  }

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
