import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Commonservices } from '../app.commonservices';
import { CookieService } from 'ngx-cookie-service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
declare var moment: any;
 
  
 

@Component({
  selector: 'app-marketingreview',
  templateUrl: './marketingreview.component.html',
  styleUrls: ['./marketingreview.component.css'],
  providers: [Commonservices]
})
export class MarketingreviewComponent implements OnInit {
  public today = new Date();
  public timezoneval:any;
  public filterval5:any;
  public product_id: any = '';
  public allslots: any;
  public allslotslength: any;
  public timezone: any = '';
  public leadData: any = '';
  public lead_id: any = '';
  public rep_data: any = '';
  public lead_data: any = '';
  public discov: boolean = false;
  public youtubeVideoUrl: any = '';
  modalRef3: BsModalRef;
  public leadflag: any = 0;
  public loading:boolean = false;
  public youtube_url: any = [
    {'product_id':"5dd68c367b583967f3e57312", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5e4e634052b7254c601f7559", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5d4d5e8cc9e23d43cc124394", 'link':"https://www.youtube.com/embed/8qkgcCBOQM4", 'start':0, 'second_start':75},
    {'product_id':"5d4d5f66c9e23d43cc1243a2", 'link':"https://www.youtube.com/embed/b86g1ATb4ok", 'start':0, 'second_start':75},
    {'product_id':"5e4e675185f01a4ee4f0ac22", 'link':"https://www.youtube.com/embed/9mgR4iPsQW0", 'start':0, 'second_start':75},
    {'product_id':"5dd68c367b583967f3e573b2", 'link':"https://www.youtube.com/embed/fnX8ZDfFzD4", 'start':0, 'second_start':175},
  ]
  public safeSrc:SafeResourceUrl;
  constructor(public _commonservice: Commonservices, public modal: BsModalService, public _http: HttpClient, public cookeiservice: CookieService, public activatedroute: ActivatedRoute, public router: Router, private sanitizer: DomSanitizer) {

    for (const key in this.youtube_url) {
      this.youtube_url[key].safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url[key].link);
    }
    // if (activatedroute.snapshot.params['lead_id'] != null) {
    //   this.lead_id = activatedroute.snapshot.params['lead_id'];
    //   this.activatedroute.data.forEach((data: any) => {
    //     this.leadData = data.results.res;
    //     console.log(this.leadData)
    //   });
    // }
    this.product_id = activatedroute.snapshot.params['product_id'];
    this._http.get("assets/data/timezone.json")
          .subscribe((res:any) => {
              this.timezone=res;
              this.timezoneval=this.cookeiservice.get('timezone');
          }, error => {
              console.log('Oooops!');
          });

    // console.log(this.product_id)
   }

   settimezone(){
     this.loading = true;
    this.cookeiservice.set('timezone',this.timezoneval);
    setTimeout(()=>{
      this.geteventarr();
    },1000);
  //   this.window.location.reload();
  }

  setdatetonull() {
    this.filterval5 = null;
    this.geteventarr();
  }
  startTime(item: any, flag: any){
    // console.log(item)
  //   this.youtube_url[key].safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.youtube_url[key].link);
  if (flag == '1') {
    this.discov = false;
    item.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.link+'?start='+item.start);
  } else if (flag == '3') {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item.link);
    this.discov = true;
  } else {
    this.discov = false;
    item.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(item.link+'?start='+item.second_start);
  }
  //  console.log(item.safeSrc)
  }

  geteventarr() {
    this.loading = true;
    let cond: any;
    if (this.filterval5 != null && this.filterval5 != '') {
      cond = {
        "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [this.product_id] }, slots: { $type: 'array' }, startdate: {
          $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
          $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
        }
      };
    } else {
      cond = {
        "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [this.product_id] }, slots: { $type: 'array' }, startdate: {
          $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
          $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
        }
      };
      console.log('cond', cond);
    }
    const link = this._commonservice.nodesslurl + 'datalistforslot';
    this._http.post(link, {rep_id: this.activatedroute.snapshot.params['rep_id'],lead_id: this.activatedroute.snapshot.params['lead_id'], condition: cond }).subscribe((res:any) => {
      this.loading = false;
      this.allslots = res.data.slots_data;
      this.allslotslength = res.data.slots_data.length;
      this.lead_data = res.data.lead_data[0].emailStatus;
      if (typeof(res.data.lead_data[0].firstname) == 'undefined' || res.data.lead_data[0].firstname == null) {
        this.leadflag = 1;
      } else{
        this.leadflag = 0;
      }
      if (this.lead_data.emailStatus == 'send') {
        console.log('++++++')
        const link1 = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
              let data = {
                  source: 'leads',
                  data: { id: this.lead_data._id, emailStatus: 'seen' }
              };
              this._http.post(link1, data).subscribe((res1: any) => {
                  console.log(res1, '+++res1');
              });
      }
      // console.log('allslots', this.allslots, this.allslots.length);
    });
  }


  ngOnInit() {
    this.slotview();
  }
  discoveryYoutubeVideoPlay(val: any, template: TemplateRef<any>){
   console.log(val)
    this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+val.link+'?autoplay=1');
    console.log(this.youtubeVideoUrl)
    this.modalRef3 = this.modal.show(template);
}

  slotview(){
    let cond = { "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": [this.product_id]}, slots:{$type:'array'}, startdate:{
      $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
      $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
  }};
  const link = this._commonservice.nodesslurl + 'datalistforslot';
        this._http.post(link,{rep_id: this.activatedroute.snapshot.params['rep_id'],lead_id: this.activatedroute.snapshot.params['lead_id'], condition:cond}).subscribe((res:any) => {
            this.allslots = res.data.slots_data;
            this.allslotslength = res.data.slots_data.length;
            // this.timezoneval = this.allslots[0].timezone;
            // this.cookeiservice.set('timezone',this.allslots[0].timezone);
            console.log(this.timezoneval,'this.timezoneval')
            if (this.lead_data.youtube == null && (this.timezoneval == '' || this.timezoneval == null || typeof(this.timezoneval) == 'undefined')) {
              this.timezoneval = this.allslots[0].timezone;
            }
            this.rep_data = res.data.rep_data[0];
            console.log(this.rep_data,'+++')
            this.lead_data = res.data.lead_data[0];
            if (typeof(res.data.lead_data[0].firstname) == 'undefined' || res.data.lead_data[0].firstname == null) {
              this.leadflag = 1;
            } else {
              this.leadflag = 0;
            }
            if (this.lead_data.emailStatus == 'send') {
              const link1 = this._commonservice.nodesslurl + 'addorupdatedata';
                    let data = {
                        source: 'leads',
                        data: { id: this.lead_data._id, emailStatus: 'seen' }
                    };
                    this._http.post(link1, data).subscribe((res1: any) => {
                      if (res1.status == 'success') {
                        
                      }
                    });
            }
        });
  }
}
