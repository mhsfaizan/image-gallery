import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GalleryServiceService } from '../gallery-service.service';
import { LoginSignupService } from '../login-signup.service';
import { MatDialog } from '@angular/material';
import { MyModalComponent } from '../my-modal/my-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private _gallery: GalleryServiceService, private cd: ChangeDetectorRef, private _lg: LoginSignupService,private _mat:MatDialog) { }
  images: any;
  uid: any;
  ngOnInit() {
    this.uid = this._lg.getUser().id;
    this._gallery.getImages()
      .on('value', (snapshot) => {
        let val = snapshot.val();
        // let images = [];
        this.images = [];

        for (let i in val) {
          this._gallery.getImageUrl(val[i].imagePath)
            .then((url) => {
              val[i].url = url;
              val[i].imageId = i;
              if (val[i].userid == this.uid) {
                this.images.push(val[i]);
                this.cd.detectChanges();
                // this._gallery.convertToObservable(images)
                //   .subscribe((images) => {
                //     this.images = images;
                //     console.log(this.images);
                //   })
              }
            })
        }
        // console.log(this.images);
      })
  }
  openModal(image){
    const modal = this._mat.open(MyModalComponent,{
      width:'100vh',
      data:{
        title: image.imageTitle,
        addGallery: false,
        isFullModal: true,
        description: image.description,
        imageid: image.imageId,
        url: image.url,
        imagepath: image.imagePath
      }
    })
    modal.afterClosed().subscribe((res) => {
      if (res != undefined) {
        console.log(res);
      }
    })
  }
}
