import {IonicApp, ViewController, AlertController , MenuController, NavController} from 'ionic-angular';
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import {HomePage} from '../home/home';

import {UserService} from '../../services/userServices';

import {qopiusUser} from '../../models/qopiusUser';


@Component({
  templateUrl: 'authentication.html',
  providers: [UserService]
})

export class AuthenticationPage {
    private user: qopiusUser;
    private loginForm: FormGroup;


    constructor(private alertCtrl: AlertController, private formBuilder: FormBuilder, private app: IonicApp, private nav: NavController, private viewController: ViewController, private menuController: MenuController, private userService: UserService ) {
      this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', Validators.required],
        description: ['Form to login the user']
      });

      this.loginForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
 
      this.onValueChanged();
    }

    logForm(){
      console.log(this.loginForm.value);
    }

    onPageLoaded(){
      console.log("pageAuthLoaded");

        this.menuController.enable(false);
        this.viewController.showBackButton(false);
    }

    onValueChanged(data?: any){
      console.log("pageAuthValueChange");
    }

    login( event ) {
        console.log("Name:"+this.loginForm.value.name);
        console.log("Password:"+this.loginForm.value.password); 
        let successCallback = this.successPopup;
        let errorCallback = this.errorPopup;
        let callbackComponent = this.nav;
        this.userService.login( this.loginForm.value.name, this.loginForm.value.password, successCallback, errorCallback, callbackComponent );

    }


    successPopup( nav: any ){
      let alert = this.alertCtrl.create({
          title: "Login Success",
          message: "You are now able to access all you\'re online Data",
          buttons: [
              {
                  text:"ok",
                  handler: () => {
                      nav.setRoot(HomePage);
                  }
              }
          ]
      });
      nav.present(alert);
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
                let alert = this.alertCtrl.create({
                    title: 'Login Failed',
                    message: ''+ message,
                    buttons: [
                        {
                            text:'Ok',
                            handler: () => {
                                //do nothing on complete
                            }
                        }
                    ]
                });
                nav.present(alert);
            }
        );
    }

    onPageWillLeave() {
    }
}
