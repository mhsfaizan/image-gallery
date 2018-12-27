import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { GalleryServiceService } from '../gallery-service.service';
import { MatDialog } from '@angular/material';
import { MyModalComponent } from '../my-modal/my-modal.component';
import { LoginSignupService } from '../login-signup.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy {
  constructor(private _gallery: GalleryServiceService, private _mat: MatDialog, private _lg: LoginSignupService, private cd: ChangeDetectorRef, private _http: HttpClient) { }
  images = [];
  uid: any;
  isShowOverlay: boolean = false;
  ngOnInit() {
    this.uid = this._lg.getUser().id;
    this._gallery.getImages()
      .on('value', (snapshot) => {
        let val = snapshot.val();
        this.images = [];
        for (let i in val) {
          this._gallery.getImageUrl(val[i].imagePath)
            .then((url) => {
              val[i].url = url;
              val[i].imageId = i;
              if (val[i].userid == this.uid) {
                this.images.push(val[i]);
                this.cd.detectChanges();
              }
            })
        }
      })
  }
  openModal(): void {
    const modal = this._mat.open(MyModalComponent, {
      width: '300px',
      data: {
        title: 'Add Photo Here',
        addGallery: true,
        isFullModal: false
      }
    });
    modal.afterClosed().subscribe((res) => {
      this.isShowOverlay = true;
      if (res != undefined) {
        this._gallery.updateGallery(this.uid, res)
          .then((res) => {
            this.isShowOverlay = false;
            console.log(res);
          }, (err) => {
            this.isShowOverlay = false;
            console.log(err);
          })
      }
      else {
        this.isShowOverlay = false;
      }
    })
  }
  openFullModal(image): void {
    const modal = this._mat.open(MyModalComponent, {
      width: '100vh',
      data: {
        title: image.imageTitle,
        addGallery: false,
        isFullModal: true,
        description: image.description,
        imageid: image.imageId,
        url: image.url,
        imagepath: image.imagePath
      }
    });
    modal.afterClosed().subscribe((res) => {
      if (res != undefined) {
        console.log(res);
      }
    })
  }
  ngOnDestroy() {
    this.cd.detach();

  }
  loginWithGoogle() {
    // let idToken, accessToken;
    this._lg.loginWithGoogle()
      .then((res) => {
        const token = this.getAccessToken(res);
        console.log(token);
        // res.credential
        // accessToken = this.getAccessToken(res);
        // this._http.get("https://www.googleapis.com/auth/photoslibrary.readonly" + '?access_token=' + encodeURIComponent(accessToken))
        //   .subscribe((resp) => {
        //     console.log(resp);
        //   }, (err) => {
        //     console.log(err);
        //   })

      }, (err) => {
        console.log(err);
      })
  }
  loginWithFacebook() {
    // let accessToken;
    this._lg.loginWithFacebook()
      .then((resp) => {
        // accessToken = this.getAccessToken(resp);
        // for(let i in resp.credential){
        //   if(i=="accessToken"){
        //     accessToken = resp.credential[i];
        //     console.log(accessToken);
        //   }
        // }
        // console.log(resp.credential);
        // this._http.get("https://graph.facebook.com/20531316728/photos?access_token="+accessToken)
        // .subscribe((resp)=>{
        //   console.log(resp);
        // },(err)=>{
        //   console.log(err);
        // })
      }, (err) => {
        console.log(err)
      })
  }
  getAccessToken(res) {
    let accessToken,idToken;
    for (let i in res.credential) {
      if (i == "idToken") {
        idToken = res.credential[i];
      }
      if (i == "accessToken") {
        accessToken = res.credential[i];
      }
    }
    return idToken;
  }
}
