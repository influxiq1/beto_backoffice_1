import { ApiService } from './../api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Commonservices } from '../app.commonservices';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
// added by Chandrani
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ActivatedRoute, Router } from '@angular/router';
declare var moment: any;
declare var $: any;
@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.css'],
  providers: [Commonservices]
})
export class AppointmentlistComponent implements OnInit {
  public googleevents: any;
  public googleeventsbackup: any;
  public last: string;
  public filterval;
  public filterval3;
  public filterval2;
  public filterval4;
  public filterval5: any;
  public filterval6;
  public userfilterval;
  public futureevent = 1;
  // added by Chandrani
  public selectedlead: any = {};
  public modalRef2: BsModalRef;
  public activeFlag: any = 1;
  public selectedstatus: any;
  public pricepoint: any;
  public issubmitprice: any = 0;
  public optionlist: any = [{ value: 'Pending', name: 'Pending' }, { value: 'Closed', name: 'Closed' }, { value: 'No Sale', name: 'No Sale' }];
  public usertype: any;
  public allslots: any;
  public googleevent: any = {};
  public timezone: any;
  public timezoneval: any;
  public product_id_for_modale: any = '';

  // ------------------ LIB LISTING --------------------------

  componentRef: any;
  datasource: any;
  status_gretterthan_zero: any;
  pendingapplication_view: any;
  joquuserlist: any;
 // custombutton: any = { label: 'my tree', fields: ['type', 'name', '_id'], url: 'http://localhost:4200/affiliate-tree' };
  placeholder: any = ['placeholder'];
  type: any = ['text'];
  name: any = ['Username'];
  products: any = [];






  appointmentlist: any = [];



  //  Example like this
  editroute: any = 'editroute';


  // use for Table Header modification

  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {
    'name': 'Organizer\'s Name',
    'startdate': 'Date Set',
    'start_time': 'Time',
    'closername': 'Rep Name',
    'phoneNumber': 'Participant\'s Phone No.',
    'productname': 'Products'

  };


  // use for Table Header Skip
  appointmentlist_skip: any = ['_id', 'attendees', 'booked_by', 'closeremail', 'eid', 'emailid', 'end_time', 'endtime_only', 'eventdata', 'eventuser', 'googleevent', 'id', 'is_custom', 'is_discovery', 'is_onboarding', 'leaddata', 'notescount', 'refresh_token', 'slot', 'starttime_only', 'summery', 'timespan', 'timezone', 'type', 'repsmsg', 'status'];
  statusarray: any = [{ val: 'true', 'name': 'pending' }];

  // use for Table Detail Field Skip
  appointmentlist_detail_skip: any = ['_id', 'attendees', 'booked_by', 'closeremail', 'eid', 'emailid', 'end_time', 'endtime_only', 'eventdata', 'eventuser', 'googleevent', 'id', 'is_custom', 'is_discovery', 'is_onboarding', 'leaddata', 'notescount', 'refresh_token', 'slot', 'starttime_only', 'summery', 'timespan', 'timezone', 'type', 'userdata'];


  // updateendpoint is use for data update endpoint
  updateendpoint = 'addorupdatedata';

  // deleteendpoint is use for data delete endpoint
  deleteendpoint = 'deletesingledata';

  // this is a database collection name
  tablename = 'contract_repote';

  // searchendpoint is use for data search endpoint
  searchendpoint = 'datalist';



  // date_search_endpoint is use for date search endpoint
  date_search_endpoint: any = 'datalist';
  // send basic limit data
  limitcond: any = {
    'limit': 10,
    'skip': 0,
    'pagecount': 1
  };

  // other data
  libdata: any = {
    // basecondition:{"startdate": moment().subtract(1, 'days').format('YYYY-MM-DD') },
    // detailview_override: [
    // ],
    updateendpoint: 'statusupdate',
    updateendpointmany: 'updateendpointmany',
    deleteendpointmany: 'deleteendpointmany',
    hideeditbutton: true, // all these button options are optional not mandatory
    hidedeletebutton: false,
    // hideviewbutton:false,
    hidestatustogglebutton: true,
    // hideaction:true,
    tableheaders: ['name', 'startdate', 'start_time', 'closername', 'phoneNumber', 'productname'], // not required
    custombuttons: [

      {
        label: 'Cancle',
        link: '#',
        type: 'externallink',
        paramtype: 'angular',
      },
      {
        label: 'Reschedule',
        link: '#',
        type: 'externallink',
        paramtype: 'angular',
      }

    ]

  };
  // send basic sort data
  sortdata: any = {
    'type': 'desc',
    'field': 'start_time',
    'options': ['start_time']
  };


  // this is a database collection or view name
  date_search_source: any = 'contract_repote';
  // datacollection
  datacollection: any = 'getappointmentlist';
  // source count
  date_search_source_count: any = 0;

  search_settings: any = {

    textsearch: [{ label: 'Search By Name', field: 'name' }, { label: 'Search By Lead Name', field: 'leaddata' }, { label: 'Search By Lead Email', field: 'emailid' }, { label: 'Search By Closer Name', field: 'closername' }],  // this is use for  text search

  };

  // this is search block



  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];

  constructor(public _commonservice: Commonservices, public modal: BsModalService, public _http: HttpClient, public cookeiservice: CookieService, public activatedroute: ActivatedRoute, public router: Router, public _apiService: ApiService) {
    // this.usertype = this.cookeiservice.get('usertype');
    // this._http.get("assets/data/timezone.json")
    //       .subscribe(res => {
    //           let result;
    //           this.timezone=result = res;
    //           this.timezoneval=this.cookeiservice.get('timezone');
    //       }, error => {
    //           console.log('Oooops!');
    //           //this.formdataval[c].sourceval = [];
    //       });

    this.datasource = '';
    this.seteventtime(1);
  }

  // settimezone(){
  //   this.cookeiservice.set('timezone',this.timezoneval);
  //   setTimeout(()=>{
  //     this.geteventarr();
  //   },1000);
  // //   this.window.location.reload();
  // }

  // setdatetonull() {
  //   this.filterval5 = null;
  //   this.geteventarr();
  // }

  // geteventarr() {
  //   let cond: any;
  //   if (this.filterval5 != null && this.filterval5 != '') {
  //     cond = {
  //       "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": this.product_id_for_modale }, slots: { $type: 'array' }, startdate: {
  //         $lte: moment(this.filterval5[1]).format('YYYY-MM-DD'),
  //         $gte: moment(this.filterval5[0]).format('YYYY-MM-DD')
  //       }
  //     };
  //   } else {
  //     cond = {
  //       "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": this.product_id_for_modale }, slots: { $type: 'array' }, startdate: {
  //         $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
  //         $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
  //       }
  //     };
  //     console.log('cond', cond);
  //   }
  //   const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
  //   this._http.post(link, { source: 'eventdayarr_events', condition: cond }).subscribe((res:any) => {
  //     this.allslots = res.res;
  //     console.log('allslots', this.allslots, this.allslots.length);
  //   });
  // }

  // usersearch() {
  //   if (this.userfilterval == null || this.userfilterval == '') {
  //     this.googleevents = this.googleeventsbackup;
  //   } else {
  //     this.googleevents = [];
  //     for (let i in this.googleeventsbackup) {
  //       if (this.googleeventsbackup[i].userdata != null && this.googleeventsbackup[i].userdata.unique_id == this.userfilterval) {
  //         this.googleevents.push(this.googleeventsbackup[i]);
  //       }
  //     }
  //   }
  // }
  // filter functions
  // filter by firstname
  // usernamesearch() {
  //   if (this.filterval == null || this.filterval == '') {
  //     this.googleevents = this.googleeventsbackup;
  //   } else {
  //     this.googleevents = [];
  //     for (let i in this.googleeventsbackup) {
  //       if (this.googleeventsbackup[i].userdata != null && this.googleeventsbackup[i].userdata.firstname == this.filterval) {
  //         this.googleevents.push(this.googleeventsbackup[i]);
  //       }
  //     }
  //   }
  // }
  // filter by lead name
  // searchbyleadname() {

  //   if (this.filterval2 == null || this.filterval2 == '') {
  //     this.googleevents = this.googleeventsbackup;
  //   } else {
  //     this.googleevents = [];
  //     for (let i in this.googleeventsbackup) {

  //       if (this.googleeventsbackup[i].leaddata.firstname != null && this.googleeventsbackup[i].leaddata.firstname.toLowerCase().indexOf(this.filterval2.toLowerCase()) > -1) {
  //         this.googleevents.push(this.googleeventsbackup[i]);
  //       }else if (this.googleeventsbackup[i].leaddata.lastname != null && this.googleeventsbackup[i].leaddata.lastname.toLowerCase().indexOf(this.filterval2.toLowerCase()) > -1) {
  //         this.googleevents.push(this.googleeventsbackup[i]);
  //       }
  //     }
  //   }
  // }
  // filter by lead email
  // searchbyleademail() {

  //   if (this.filterval3 == null || this.filterval3 == '') {
  //     this.googleevents = this.googleeventsbackup;
  //   } else {
  //     this.googleevents = [];
  //     for (let i in this.googleeventsbackup) {

  //       if (this.googleeventsbackup[i].leaddata.email != null && this.googleeventsbackup[i].leaddata.email.toLowerCase().indexOf(this.filterval3.toLowerCase()) > -1) {
  //         this.googleevents.push(this.googleeventsbackup[i]);
  //       }
  //     }
  //   }
  // }
  // filter by closer name
  // searchbyclosername() {

  //   if (this.filterval4 == null || this.filterval4 == '') {
  //     this.googleevents = this.googleeventsbackup;
  //   } else {
  //     this.googleevents = [];
  //     for (let i in this.googleeventsbackup) {

  //       if (this.googleeventsbackup[i].closername != null && this.googleeventsbackup[i].closername.toLowerCase().indexOf(this.filterval4.toLowerCase()) > -1) {
  //         this.googleevents.push(this.googleeventsbackup[i]);
  //       }
  //     }
  //   }
  // }
  // filter by price point
  // searchbypricepoint() {

  //   if (this.filterval5 == null || this.filterval5 == '') {
  //     this.googleevents = this.googleeventsbackup;
  //   } else {
  //     this.googleevents = [];
  //     for (let i in this.googleeventsbackup) {

  //       if (this.googleeventsbackup[i].pricepoint != null && this.googleeventsbackup[i].pricepoint.toLowerCase().indexOf(this.filterval5.toLowerCase()) > -1) {
  //         this.googleevents.push(this.googleeventsbackup[i]);
  //       }
  //     }
  //   }
  // }


  ngOnInit() {
    // this.getgoogleevents();
  }
  getgoogleevents() {
    let sourcecondition;
    if (this.cookeiservice.get('usertype') == 'admin') {
      if (this.futureevent == 1) {
        sourcecondition = { startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') }, is_canceled: { $ne: 1 } };
      } else {
        sourcecondition = { startdate: { $lt: moment().format('YYYY-MM-DD') }, is_canceled: { $ne: 1 } };
      }
      if (this.router.url.indexOf('appointmentlist') > -1 && this.activatedroute.snapshot.params.leadid != null) {
        if (this.futureevent == 1) {
          sourcecondition = { startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') }, is_canceled: { $ne: 1 }, lead_id: this.activatedroute.snapshot.params.leadid };
        } else {
          sourcecondition = { startdate: { $lt: moment().format('YYYY-MM-DD') }, is_canceled: { $ne: 1 }, lead_id: this.activatedroute.snapshot.params.leadid };
        }

      }
    } else {
      if (this.futureevent == 1) {
        sourcecondition = {
          startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') },
          eventuser_object: this.cookeiservice.get('userid'), is_canceled: { $ne: 1 }
        };
      } else {
        sourcecondition = {
          startdate: { $lt: moment().format('YYYY-MM-DD') },
          eventuser_object: this.cookeiservice.get('userid'), is_canceled: { $ne: 1 }
        };
      }
      if (this.router.url.indexOf('appointmentlist') > -1 && this.activatedroute.snapshot.params.leadid != null) {
        if (this.futureevent == 1) {
          sourcecondition = {
            startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') },
            eventuser_object: this.cookeiservice.get('userid'), is_canceled: { $ne: 1 }, lead_id: this.activatedroute.snapshot.params.leadid
          };
        } else {
          sourcecondition = {
            startdate: { $lt: moment().format('YYYY-MM-DD') },
            eventuser_object: this.cookeiservice.get('userid'), is_canceled: { $ne: 1 }, lead_id: this.activatedroute.snapshot.params.leadid
          };
        }

      }

    }



    if (this.cookeiservice.get('usertype') == 'rep') {
      if (this.futureevent == 1) {
        sourcecondition = { startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') }, is_canceled: { $ne: 1 }, booked_by: this.cookeiservice.get('userid') };
      } else {
        sourcecondition = { startdate: { $lt: moment().format('YYYY-MM-DD') }, is_canceled: { $ne: 1 }, booked_by: this.cookeiservice.get('userid') };
      }
    }
    if (this.router.url.indexOf('appointments') > -1 && this.activatedroute.snapshot.params.leadid != null) {
      sourcecondition = { lead_id: this.activatedroute.snapshot.params.leadid };
    }

    // sourcecondition={unique_id:35920};
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, {
      source: 'googleevents_view', condition: sourcecondition
    })
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'error') {
        } else {
          this.googleevents = result.res;
          this.googleeventsbackup = result.res;
        }
      }, error => {
        console.log('Oooops!');
      });
  }
  seteventtime(val) {
    this.activeFlag = val;
    this.futureevent = val;
    if(this.cookeiservice.get('usertype') == 'admin'){
    if (val == 0) {
      this.getdata({

        'condition': {
          'limit': 10,
          'skip': 0,
          "cond": {
            startdate: { $lt: moment().format('YYYY-MM-DD') }, is_canceled: { $ne: 1 }}
        },
        'sort': {
          'type': 'desc',
          'field': 'start_time'
        }
      })
    } else if(val == 1) {
      this.getdata({

        'condition': {
          'limit': 10,
          'skip': 0,
          "cond": {
            startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')},
            is_canceled: { $ne: 1 }
          }
        },
        'sort': {
          'type': 'desc',
          'field': 'start_time'
        }
      })
    } else {
      this.getdata({

        'condition': {
          'limit': 10,
          'skip': 0,
          "cond": {
            is_canceled: { $eq: 1 }
          }
        },
        'sort': {
          'type': 'desc',
          'field': 'start_time'
        }
      })
    }
  }
  else{
    if (val == 0) {
      this.getdata({

        'condition': {
          'limit': 10,
          'skip': 0,
          "cond": {
            startdate: { $lt: moment().format('YYYY-MM-DD') }, is_canceled: { $ne: 1 },booked_by:this.cookeiservice.get('userid')}
        },
        'sort': {
          'type': 'desc',
          'field': 'start_time'
        }
      })
    } else if(val == 1) {
      this.getdata({

        'condition': {
          'limit': 10,
          'skip': 0,
          "cond": {
            startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')},
            is_canceled: { $ne: 1 },
            booked_by:this.cookeiservice.get('userid')
          }
        },
        'sort': {
          'type': 'desc',
          'field': 'start_time'
        }
      })
    } else {
      this.getdata({

        'condition': {
          'limit': 10,
          'skip': 0,
          "cond": {
            is_canceled: { $eq: 1 },
            booked_by:this.cookeiservice.get('userid')
          }
        },
        'sort': {
          'type': 'desc',
          'field': 'start_time'
        }
      })
    }

  }
    
  }


  getdata(data){
    const endpoint = 'getappointmentlist'; // for main data endpoint
    const endpointc = 'getappointmentlist-count'; // for count endpoint
    // data param for conditionlimit and search
    


    const link = this._commonservice.nodesslurl + endpoint;
    const link1 = this._commonservice.nodesslurl + endpointc;
    this._http.post(link, data)
      .subscribe((response: any) => {
        this.appointmentlist = response.results.res;
        console.warn('blogData', this.appointmentlist);
      });

    this._http.post(link1, data)
      .subscribe((res: any) => {
        console.log(res, ' for count');
        this.date_search_source_count = res.count;
      });
  }
  // added by Chandrani
  // notesdata(val: any, template: TemplateRef<any>) {
  //   this.selectedlead = val;
  //   setTimeout(() => {
  //     this.modalRef2 = this.modal.show(template);
  //   }, 2000);


  // }

  // reschedule_data(val:any, template: TemplateRef<any>){
  //   console.log(val)
  //   this.product_id_for_modale = val.userdata.product;
  //   if (val.googleevent != 'N/A') {
  //     //  this.googleevent = {"googleevent":val.googleevent, "refresh_token":val.refresh_token,"prv_id":val._id, "prvslot":val.slot, lead_id:val.lead_id, leaddata:val.leaddata};
  //      this.googleevent = val;
  //   }
  //   let cond = { "is_discovery": false, "is_onboarding": false, "is_qna": false, "is_custom": false, "userproducts": { "$in": val.userdata.product}, slots:{$type:'array'}, startdate:{
  //     $lte: moment().add(2, 'weeks').format('YYYY-MM-DD'),
  //     $gt: moment().subtract(1, 'days').format('YYYY-MM-DD')
  // }};

  // const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
  //       this._http.post(link,{source:'eventdayarr_events',condition:cond}).subscribe((res:any) => {
  //           this.allslots = res.res;
  //           console.log('allslots',this.allslots,this.allslots.length);
  //       });
  //   this.modalRef2 = this.modal.show(template);
  // }

  getCanceledAppoint() {
    let sourcecondition;
    if (this.cookeiservice.get('usertype') == 'admin') {
      // if (this.futureevent == 1) {
      // sourcecondition = { startdate: { $gt: moment().subtract(1, 'days').format('YYYY-MM-DD') }, is_canceled: 1 };
      sourcecondition = { is_canceled: 1 };
      // }
      // else {
      //   sourcecondition = { is_canceled: 1 };
      // }
    } else if (this.cookeiservice.get('usertype') == 'rep') {
      // if (this.futureevent == 1) {
      sourcecondition = {
        booked_by: this.cookeiservice.get('userid'), is_canceled: 1
      };
      // }
      //  else {
      //   sourcecondition = {
      //     startdate: { $lt: moment().format('YYYY-MM-DD') },
      //     eventuser_object: this.cookeiservice.get('userid'), is_canceled: 1
      //   };
      // }

    } else {
      sourcecondition = {
        eventuser_object: this.cookeiservice.get('userid'), is_canceled: 1
      };
    }
    // sourcecondition={unique_id:35920};
    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    this._http.post(link, {
      source: 'googleevents_view', condition: sourcecondition
    })
      .subscribe(res => {
        let result: any;
        result = res;
        if (result.status == 'error') {
        } else {
          this.activeFlag = 2;
          this.googleevents = result.res;
          this.googleeventsbackup = result.res;
        }
      }, error => {
        console.log('Oooops!');
      });
  }

  // cancelAppointment(google_event_id: any, refresh_token: any, eid: any) {
  //   // console.log("google_event_id",google_event_id,"refresh_token",refresh_token,"eid",eid);
  //   // return;
  //   let link = 'https://gapi.betoparedes.com/deleteevent.php?event=' + google_event_id + '&refresh_token=' + refresh_token;
  //   this._http.get(link)
  //     .subscribe(res => {
  //       let result: any;
  //       result = res;
  //       if (result.status == 'success') {
  //         let linkfordb = this._commonservice.nodesslurl + 'addorupdatedata';
  //         let datafordb = {
  //           "source": "googleevents", "data": {
  //             "is_canceled": 1, "id": eid
  //           }, sourceobj: []
  //         };
  //         this._http.post(linkfordb, datafordb)
  //           .subscribe(response => {
  //             let result2: any;
  //             result2 = response;
  //             if (result2.status == 'success') {
  //               this.getgoogleevents();
  //             }
  //           }, error => {
  //             console.log('Oooops!!!');
  //           });
  //       } else {
  //         console.log(result);
  //       }
  //     }, error => {
  //       console.log('Oooops!');
  //     });
  // }
  // toggleStatusInArray(item) {
  //   if (item.status == null) item.status = 'Pending';
  //   $('.statusspan').removeClass('hide');
  //   $('.statusspan').addClass('show');
  //   $('.selectintable').removeClass('show');
  //   $('.selectintable').addClass('hide');
  //   $('#span' + item._id).removeClass('show');
  //   $('#span' + item._id).addClass('hide');
  //   $('#select' + item._id).removeClass('hide');
  //   $('#select' + item._id).addClass('show');
  // }

  // toggleFromSelect(event: any, item: any) {
  //   let status: any;
  //   status = event;
  //   this.selectedstatus = status;
  //   const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
  //   let data = {
  //     source: 'googleevents',
  //     data: { id: item._id, status: status }
  //   };
  //   this._http.post(link, {
  //     source: 'googleevents',
  //     data: { id: item._id, status: status }
  //   }
  //   )
  //     .subscribe(res => {
  //       this.getgoogleevents();
  //     }, error => {
  //       console.log('Oooops!');
  //       this.getgoogleevents();
  //     });
  // }

  // openPricepointModal(item: any, template: TemplateRef<any>) {
  //   this.selectedlead = item;
  //   this.modalRef2 = this.modal.show(template);
  // }

  // addPrice() {

  //   if (this.pricepoint == '' || this.pricepoint == null) {
  //     this.issubmitprice = 1;
  //   } else {
  //     const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
  //     /* console.log('link');
  //      console.log(link);*/
  //     this._http.post(link, {
  //       source: 'googleevents',
  //       data: { id: this.selectedlead._id, pricepoint: this.pricepoint }
  //     }
  //     )
  //       .subscribe(res => {
  //         this.pricepoint = '';
  //         this.getgoogleevents();
  //         this.modalRef2.hide();
  //       }, error => {
  //         this.pricepoint = '';
  //         this.getgoogleevents();
  //       });
  //   }

  // }

}
