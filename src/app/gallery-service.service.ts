import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage } from '@angular/fire/storage';
@Injectable({
  providedIn: 'root'
})
export class GalleryServiceService {
  imageRef: any;
  constructor(private _http: HttpClient, private _auth: AngularFireAuth, private _db: AngularFireDatabase, private _storage: AngularFireStorage) {
    this.imageRef = this._storage.storage.ref().child("images");
  }
  getImages() {
    // return this._http.get("assets/gallery.json");
    return this._db.database.ref("gallery").orderByKey();

  }
  uploadImage(file) {
    // return this._storage.storage.ref().child("images/"+file.name).put(file);
    return this.imageRef.child(file.name)
      .put(file);
  }
  updateGallery(uid, imageData) {
    imageData.userid = uid;
    return this._db.database.ref("/gallery").push(imageData);
  }
  getImageUrl(image) {
    return this._storage.storage.ref().child(image).getDownloadURL();
  }
  delete(id, imagepath,cb) {
    this._storage.storage.ref().child(imagepath).delete()
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
}
