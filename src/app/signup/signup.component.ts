import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginSignupService } from '../login-signup.service';
import { MatSnackBar } from '@angular/material';
import { MysnackbarComponent } from '../mysnackbar/mysnackbar.component';
import { Router } from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public _login: LoginSignupService, private snackbar: MatSnackBar, private _router: Router) { }
  isShowProgress: boolean = false;
  pass: string = '';
  ngOnInit() {
  }
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    cpassword: new FormControl('', [Validators.required]),
  })
  signup(form) {
    this.isShowProgress = true;
    this._login.isShowOverlay = true;
    this._login.signup(this.signupForm.value)
      .then((resp) => {
        console.log(resp.user);
        this._login.onStateChanged(this.signupForm.value.name)
          .then((res) => {
            console.log(resp);
            this.isShowProgress = false;
            this._login.isShowOverlay = false;
            this.openSnackbar("successfully Signed up")
              .afterDismissed()
              .subscribe(() => {
                let user = {};
                for (let i in this.signupForm.value) {
                  if (i == 'password' || i == "cpassword") {
                    continue;
                  }
                  else {
                    user[i] = this.signupForm.value[i];
                  }
                }
                this._login.saveDataToUser(user, resp.user.uid)
                  .then((res) => {
                    console.log(res);
                    let user = {
                      id: '',
                      email: '',
                      displayName: ''
                    }
                    user.id = resp.user.uid;
                    user.email = resp.user.email;
                    user.displayName = this.signupForm.value.name;
                    console.log(user);
                    this._login.saveUser(user);
                    this._router.navigate(['/dashboard'])

                  }, (err) => {
                    console.log(err);
                  })
              });
          }, (err) => {
            console.log(err);
          })
        // setTimeout(() => {
        //   this.isShowProgress = false;
        //   this._login.isShowOverlay = false;
        //   this.openSnackbar("successfully Signed up")
        //     .afterDismissed()
        //     .subscribe(() => {
        //       let user = {};
        //       for (let i in this.signupForm.value) {
        //         if (i == 'password' || i == "cpassword") {
        //           continue;
        //         }
        //         else {
        //           user[i] = this.signupForm.value[i];
        //         }
        //       }
        //       this._login.saveDataToUser(user, resp.user.uid)
        //         .then((res) => {
        //           console.log(res);
        //           let user = {
        //             id: '',
        //             email: '',
        //             displayName: ''
        //           }
        //           user.id = resp.user.uid;
        //           user.email = resp.user.email;
        //           user.displayName = resp.user.displayName;
        //           console.log(user);
        //           this._login.saveUser(user);
        //           this._router.navigate(['/dashboard'])

        //         }, (err) => {
        //           console.log(err);
        //         })
        //     });
        // }, 2000)
      },
        (err) => {
          setTimeout(() => {
            this.isShowProgress = false;
            this._login.isShowOverlay = false;
            this.openSnackbar(err.message)
              .afterDismissed()
              .subscribe((resp) => {
                console.log(resp);
                // form.reset();
              })
          }, 2000)
        })
  }
  openSnackbar(message) {
    return this.snackbar.openFromComponent(MysnackbarComponent, {
      duration: 2000,
      data: message
    })
  }
}
