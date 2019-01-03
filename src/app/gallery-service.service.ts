import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GalleryServiceService {
  imageRef: any;
  constructor(private _http: HttpClient, private _auth: AngularFireAuth, private _db: AngularFireDatabase, private _storage: AngularFireStorage) {
    this.imageRef = this._storage.storage.ref();
  }
  getImages() {
    // return this._http.get("assets/gallery.json");
    return this._db.database.ref("gallery").orderByKey();

  }
  uploadImage(file) {
    console.log(file);
    return this._storage.storage.ref().child("images/"+file.name).put(file);
    // return this.imageRef.child("images/"+file.name)
      // .put(file);
  }
  updateGallery(uid, imageData) {
    imageData.userid = uid;
    return this._db.database.ref("/gallery").push(imageData);
  }
  getImageUrl(imagePath) {
    return this.imageRef.child(imagePath).getDownloadURL();
  }
  delete(id, imagepath,cb) {
    this.imageRef.child(imagepath).delete()
    .then((res)=>{
      this._db.database.ref("gallery").child(id).remove()
      .then((resp)=>{
        console.log(resp);
        cb("Succefully Deleted !!");
      },(err)=>{
        console.log(err);
        cb("err");
      })
    },(err)=>{
      console.log(err); 
      cb("err");
    })
  }
  convertToObservable(images){
    return of(images);
  }
}
