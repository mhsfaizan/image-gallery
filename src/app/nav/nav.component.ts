import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginSignupService } from '../login-signup.service';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { MysnackbarComponent } from '../mysnackbar/mysnackbar.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @ViewChild('drawer') drawer: MatSidenav;
  user;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(public snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver, private _login: LoginSignupService, private _router: Router) { }
  logout() {
    this._login.logout()
      .then(() => {
        this.openSnackBar("Succefully signout");
      })
      .catch(() => {
        this.openSnackBar("Error in Signout");
      })
  }
  openSnackBar(message) {
    this.snackBar.openFromComponent(MysnackbarComponent, {
      duration: 2000,
      data: message
    })
      .afterDismissed()
      .subscribe(() => {
        this._router.navigate(["/login"]);
      })
  }
  ngOnInit() {
    this._router.events.subscribe((resp) => {
      if(resp instanceof NavigationEnd){
        if (window.screen.width < 768) {
          this.drawer.opened = false;
        }
      }
    })
    this.user = this._login.getUser();
  }
}
