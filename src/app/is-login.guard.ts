import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginSignupService } from './login-signup.service';

@Injectable({
  providedIn: 'root'
})
export class IsLoginGuard implements CanActivate {
    constructor(private _lg:LoginSignupService,private _router:Router){

    }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this._lg.isUserLoggedIn()){
      this._router.navigate(["/dashboard"])
    }
    else{
      return true;
    }
  }
}
