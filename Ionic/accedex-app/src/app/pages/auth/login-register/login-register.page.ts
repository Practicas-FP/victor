/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    public router: Router
  ) { }

  ngOnInit() {
  }

  logIn(email, password) {
    this.authService.SignIn(email.value, password.value)
      .then((res) => {
        if (this.authService.isEmailVerified) {
          this.router.navigate(['pokedex']);
        } else {
          window.alert('Email is not verified');
          return false;
        }
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email, password) {
    this.authService.RegisterUser(email.value, password.value)
      .then((res) => {
        this.authService.SendVerificationMail();
        this.router.navigate(['verify-email']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  recoverPassword(email) {
    this.authService.PasswordRecover(email)
      .then((res) => {

      })
      .catch((error) => {
        window.alert(error.message);
      });

    this.viewRecoverPassword = false;
  }
}
