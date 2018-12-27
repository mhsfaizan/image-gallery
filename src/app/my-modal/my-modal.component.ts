import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GalleryServiceService } from '../gallery-service.service';
@Component({
  selector: 'app-my-modal',
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css']
})
export class MyModalComponent implements OnInit {
  isSHowOverlay:boolean = false;
  constructor(private _dr:MatDialogRef<MyModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _gs:GalleryServiceService) { }
  ngOnInit() {
  }
  onNoClick(){
    this._dr.close();
  }
  galForm = new FormGroup({
    imageTitle:new FormControl('',Validators.required),
    image:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required)
  })
  upload(file){
    this.isSHowOverlay = true;
    this._gs.uploadImage(file.files[0])
    .then((res)=>{
      this.isSHowOverlay = false;
      this.galForm.addControl("imagePath",new FormControl(res.metadata.fullPath,Validators.required));
    },(err)=>{
      this.isSHowOverlay = false;
      console.log(err);
    })
  }
  delete(id,imagepath){
    let x = confirm("Are You Sure to delete");
    if(x){
      this._gs.delete(id,imagepath,(res)=>{
        alert(res);
        this.onNoClick();
      });
    }
  }
}
