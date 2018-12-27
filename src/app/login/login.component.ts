import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginSignupService } from '../login-signup.service';
import { MatSnackBar } from '@angular/material';
import { MysnackbarComponent } from '../mysnackbar/mysnackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;
  isShowProgress: boolean = false;
  constructor(public _login: LoginSignupService, public _sn: MatSnackBar, private _rtr: Router) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })
  ngOnInit() {
  }
  login(form) {
    this.isShowProgress = true;
    this._login.isShowOverlay = true;
    this._login.login(this.loginForm.value)
      .then((resp) => {
        console.log(resp.user);
        let user = {
          id: '',
          email: '',
          displayName: ''
        };
        user.id = resp.user.uid;
        user.email = resp.user.email;
        user.displayName = resp.user.displayName;
        // this._login.loginUser();
        this._login.saveUser(user);
        this.message = "Successfully signed In";
        this.isShowProgress = false;
        this._login.isShowOverlay = false;
        this.openSnackBar(this.message);
      })
      .catch((err) => {
        console.log(err);
        this.message = "Email Or Password wrong";
        this.isShowProgress = false;
        this._login.isShowOverlay = false;
        this.openSnackBar(this.message);
      });
  }
  openSnackBar(message: string) {
    this._sn.openFromComponent(MysnackbarComponent, {
      duration: 2000,
      data: message
    })
      .afterDismissed()
      .subscribe(() => {
        this._rtr.navigate(['/dashboard'])
      })
  }
} 
