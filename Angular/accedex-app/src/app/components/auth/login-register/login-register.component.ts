import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent implements OnInit {

  login: boolean = true;
  alert: boolean = false;
  alertMessage: string | Promise<any> = 'Test message';
  alertColor: string = 'alert-warning';
  resetEmail: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
  }

  getAlertVisibility(visible: boolean) {
    this.alert = visible;
  }

  resetPassword(passwordResetEmail: string) {
    this.authService.ForgotPassword(passwordResetEmail); 
    this.resetEmail === false;
  }
}
