/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.page.html',
  styleUrls: ['./login-register.page.scss'],
})
export class LoginRegisterPage implements OnInit {

  viewLogin = true;
  viewRecoverPassword = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    public toastController: ToastController
  ) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['pokedex']);
        } else {
          this.presentToast('Email is not verified');
          return false;
        }
      }).catch((error) => {
        this.presentToast(error.message);
      });
  }

  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        this.authService.SendVerificationMail();
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        this.presentToast(error.message);
      });
  }

  recoverPassword(email) {
    this.authService.PasswordRecover(email)
      .then((res) => {

      })
      .catch((error) => {
        this.presentToast(error.message);
      });

    this.viewRecoverPassword = false;
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
