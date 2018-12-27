import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestUserService {
  private client_id = "Iv1.cfb4af1964b799cd";
  private client_secret = "93094a5e750eb9853401ce996778a6471f6ce7a1";
  constructor(private _http:HttpClient) { 
  }
  getGitInfo(value){
    // this._http.get("https://api.github.com/rate_limit")
    // .subscribe((res)=>{
    //   console.log(res);
    // },(err)=>{
    //   console.log(err);
    // })
    return this._http.get("https://api.github.com/users/"+value+"?client_id="+this.client_id+"&client_secret="+this.client_secret);
  }
}
