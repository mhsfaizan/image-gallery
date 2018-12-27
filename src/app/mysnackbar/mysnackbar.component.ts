import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-mysnackbar',
  templateUrl: './mysnackbar.component.html',
  styleUrls: ['./mysnackbar.component.css']
})
export class MysnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
  }

}
