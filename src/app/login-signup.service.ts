import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firestore from "firebase/app";
@Injectable({
  providedIn: 'root'
})
export class LoginSignupService {
  // private isLoggedIn:boolean = false;
  public isShowOverlay:boolean = false;
  constructor(private _auth:AngularFireAuth,private _db:AngularFireDatabase) { 
  }
  login(loginForm){
    // console.log(loginForm);
    return this._auth.auth.signInWithEmailAndPassword(loginForm.email,loginForm.password);
  }
  saveUser(user){
    localStorage.setItem("user",JSON.stringify(user));
  }
  // loginUser(){
  //   this.isLoggedIn = true;
  // }
  getUser(){
    return JSON.parse(localStorage.getItem("user"));
  }
  isUserLoggedIn(){
    if(localStorage.getItem("user") != null){
      return true;
    }
    else{
      return false;
    }
  }
  logout(){
    // this.isLoggedIn = false;
    localStorage.removeItem("user");
    return this._auth.auth.signOut()
  }
  signup(signup){
    return this._auth.auth.createUserWithEmailAndPassword(signup.email,signup.password);
  }
  saveDataToUser(user,id){
    return this._db.database.ref("/user/"+id).set(user);
  }
  onStateChanged(name){
    let user = this._auth.auth.currentUser;
    if(user){
      return user.updateProfile({
        displayName:name,
        photoURL:""
      });
    }
    else{
      console.log("signout");
    }
  }
  loginWithGoogle(){
    let provider =  new firestore.auth.GoogleAuthProvider();
    return this._auth.auth.signInWithPopup(provider);
  }
  loginWithFacebook(){
    let provider = new firestore.auth.FacebookAuthProvider();
    return this._auth.auth.signInWithPopup(provider);
  }
}


