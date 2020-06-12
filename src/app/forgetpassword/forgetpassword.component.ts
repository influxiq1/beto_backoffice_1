import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css'],
  providers: [Commonservices]
})
export class ForgetpasswordComponent implements OnInit {

  constructor(kp: FormBuilder, private router: Router, private _commonservices: Commonservices, private _http: HttpClient, private cookeiservice: CookieService) {
    this.kp = kp;
    this.serverurl = _commonservices.url;
    this.nodesslurl = _commonservices.nodesslurl;
  }
  public dataForm: FormGroup;
  public kp;
  public serverurl;
  public nodesslurl;
  public errormg: any = '';
  public issubmit = 0;
  public showmessage;

  static customValidator(inputemail): any {
    if (inputemail.pristine) {
      return null;
    }
    inputemail.markAsTouched();
    const filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    if (String(inputemail.value).search(filter) == -1) {
      return {
        invalidemail: true

      };
    }
  }

  ngOnInit() {
    this.dataForm = this.kp.group({
      email: ['', Validators.compose([Validators.required, ForgetpasswordComponent.customValidator])]
    });
  }

  dosubmit(formval) {
    this.issubmit = 1;
    this.errormg = '';
    let x: any;
    for (x in this.dataForm.controls) {
      this.dataForm.controls[x].markAsTouched();
      console.log(this.dataForm.controls[x].valid);
    }
    if (this.dataForm.valid) {
      const link = this._commonservices.nodesslurl + 'forgetpassword';
      const data = {email: formval.email};
      this._http.post(link, data)
          .subscribe(res => {
            let result: any = {};
            result = res;
            console.log('result:');
            console.log(result);
            this.issubmit = 0;
            if (result.status == 'error') {
              this.errormg = result.msg;
            }
            if (result.status == 'success') {
              this.showmessage = 'We’ve sent an email to this address to reset your password.';
            }
          }, error => {
            console.log('Oooops!');
          });
    }
  }
}
