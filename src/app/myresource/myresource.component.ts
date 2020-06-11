import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {Commonservices} from '../app.commonservices' ;
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
 declare var $: any;

@Component({
  selector: 'app-myresource',
  templateUrl: './myresource.component.html',
  styleUrls: ['./myresource.component.css'],
  providers: [Commonservices],
})
export class MyresourceComponent implements OnInit {
  public sourceconditionval: any;
  public resources: any;
  public catid: any;
  public catname: any;
  public launchDate: any;
  public modalRef: BsModalRef;
    orderbyquery: any;

    constructor(public cookie: CookieService, public router: Router, private _commonservices: Commonservices, private _http: HttpClient, public route: ActivatedRoute, public modal: BsModalService) {
  }

  ngOnInit() {
        this.route.params.subscribe(params => {
            this.catid = params['catid'];
            this.resourcecat();
            const catagoryName = params['catname'];
            if (catagoryName != null && catagoryName != 'undefined') {
              this.catname = catagoryName.replace(/_/gi, ' ');
              console.log(this.catid, '+++++', this.catname);
            }
        });
      this.orderbyquery = 'firstname';
  }
  launchDetails(val: any, template: TemplateRef<any>) {
    console.log(val);
    this.launchDate = val;
    this.modalRef = this.modal.show(template);
    setTimeout(() => {
    this.modalRef.hide();       // to hide the modal in 10 sec
  }, 2000);
  }


    resourcecat() {
        // if(this.catid!=null){
        //     this.sourceconditionval ={category_object:this.catid};
        // }else{
            this.sourceconditionval = {status: true};
        // }
        const link = this._commonservices.nodesslurl + 'datalist?token=' + this.cookie.get('jwttoken');
        this._http.post(link, {source: 'resourcecategory_view', condition: this.sourceconditionval})
            .subscribe((result: any) => {
          if (result.status == 'error') {

          } else {

            this.resources = [];
            this.resources = result.res;
            console.log(result.res);
            if (this.catname != null && this.catname != 'undefined' && this.resources.length > 0) {
              setTimeout(() => {
                const elmnt = document.getElementById(this.catname);
                elmnt.scrollIntoView({ behavior: 'smooth' });
              }, 500);
            }
          }
        }, error => {
          console.log('Oooops!');
          this.resources = [];
        });
  }
}
