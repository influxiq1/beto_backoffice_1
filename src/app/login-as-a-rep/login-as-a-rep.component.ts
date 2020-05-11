import { Component, OnInit } from '@angular/core';
import { Commonservices } from '../app.commonservices';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-login-as-a-rep',
  templateUrl: './login-as-a-rep.component.html',
  styleUrls: ['./login-as-a-rep.component.css'],
  providers: [Commonservices]
})
export class LoginAsARepComponent implements OnInit {

  constructor(public commonservices: Commonservices, public cookieservice: CookieService, public originalCookie: CookieService, public _http: HttpClient, private router: Router, public modal: BsModalService,public _apiService: ApiService, public activatedRoute :ActivatedRoute) {
    console.log(this.activatedRoute.snapshot.params._id)
    console.log(this.activatedRoute.snapshot.params.email);
    this.getUserDetails(this.activatedRoute.snapshot.params.email);
   }

  ngOnInit() {
    
  }

  
  // added by chandrani
  getUserDetails(email: any) {
    let link = this.commonservices.nodesslurl + 'datalist?token=' + this.cookieservice.get('jwttoken');
    let data = { source: 'users', condition: { email: email } };
    this._http.post(link, data)
      .subscribe(res => {

        let originalcookiedata: any;
        originalcookiedata = this.cookieservice.getAll();
        this.cookieservice.set('oldcookie', JSON.stringify(originalcookiedata));
        let result: any; //originalCookie
        result = res;
        if (result.resc == 1 && result.res != null && result.res[0] != null) {
          if (result.res[0].status == 1) {


            this.cookieservice.set('jwttoken', this.cookieservice.get('jwttoken'));
            this.cookieservice.set('userid', result.res[0]._id);

            if (result.res[0].is_contract_signed == null && result.res[0].type == 'rep') {
              this.router.navigate(['/agreement']);
              return;
            }


            this.cookieservice.set('lockdornot', result.res[0].lock);
            this.cookieservice.set('usertype', result.res[0].type);
            this.cookieservice.set('useremail', result.res[0].email);
            this.cookieservice.set('is_consultant', result.res[0].is_consultant);
            this.cookieservice.set('calenderaccess', result.res[0].calenderaccess);
            this.cookieservice.set('fullname', result.res[0].firstname + ' ' + result.res[0].lastname);
            if (result.res[0].type == 'admin') {
              this.router.navigate(['/dashboard']);
            }
            if (result.res[0].type == 'regional_recruiter') {
              this.cookieservice.set('refreshtoken', result.res[0].refreshtoken);
              this.router.navigate(['/regionaldashboard']);
            }
            if (result.res[0].type == 'rep') {
              if (result.res[0].status == 0) {
                this.router.navigate(['/tempaccess']);
                return;
              }

              if (result.res[0].status == 1) {
                this.router.navigate(['/repdashboard']);
                return;
              }


              if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == null && result.res[0].reptraininglessonstep == null) this.router.navigate(['/contract']);
              if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == 1 && result.res[0].reptraininglessonstep == null) this.router.navigate(['/reptrainingcenter']);
              if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == 1 && result.res[0].reptraininglessonstep == 1) this.router.navigate(['/repdashboard']);
            }
          }
        }
      })
  }

}
