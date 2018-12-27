import { Component, OnInit } from '@angular/core';
import { TestUserService } from '../test-user.service';

@Component({
  selector: 'app-test-user',
  templateUrl: './test-user.component.html',
  styleUrls: ['./test-user.component.css']
})
export class TestUserComponent implements OnInit {
  user: any;
  isShowSpinner;
  isFound = 0;
  constructor(private _test: TestUserService) { }

  ngOnInit() {
  }
  getGitInfo(code, userKey,isFromButton=false) {
    if (code == 13||isFromButton) {
      this.isShowSpinner = true;
      this.isFound = 0;
      this._test.getGitInfo(userKey)
        .subscribe((resp) => {
          this.isShowSpinner = false;
          setTimeout(()=>this.isFound = 1,1000);
          this.user = resp;
          console.log(resp);
        }, (err) => {
          this.isShowSpinner = false;
          setTimeout(()=>this.isFound = 2,1000);
          console.log(err)
        })
      // console.log(input);
    }
  }
}
