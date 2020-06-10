import { Component, OnInit, TemplateRef } from '@angular/core';
import { Commonservices } from "../app.commonservices";
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-usermanagement',
  templateUrl: './usermanagement.component.html',
  styleUrls: ['./usermanagement.component.css'],
  providers: [Commonservices]
})
export class UsermanagementComponent implements OnInit {
  public singleuserdata: any = [];
  public filterval;
  public filterval1;
  public filterval2;
  public selecteditem;
  public medicaAaparchunitiValue: any = '';
  public message;
  modalRef: BsModalRef;
  public loader: any = 0;
  public eventList: any = [];
  public eventtype: any;
  public consultantrole: any;
  public usertype: any;
  public fileurl: any;
  // public mdstockToggle = 0; 

  userdata: any = [];

  public datasource: any = '';

  public status: any = [{ val: 0, 'name': 'Active' }, { val: 1, 'name': 'Inactive' }];   // use for status search
  public type:any = [{val:'rep', 'name': 'Rep'},{val:'contract_manager', 'name': 'Contract Manager'},{val:'regional_recruiter', 'name':'Regional Recruiter'},{val:'admin', 'name':'Admin'}]
  statusarray: any = [{ val: 0, name: 'Active' }, { val: 1, name: 'Inactive' }];  //status name set

  //emailarray: any = [{ val: 'sourotest222@gmail.com', name: 'sourotest222@gmail.com' }]; //Static Email search eg.

  //editroute: any = 'editroute'; // use for edit any field Navigate that page And you should be import the 
  modify_header_array: any = {
    'parentname': 'Parent Name',
    'fullname': 'Full Name',
    'email': 'E mail',
    'phoneno': 'Phone No.',
    'status': 'Status',
    'created_datetime': 'Date Joined',
    "type": "Account Type"
  };

  userdata_header_skip: any = ['lock', 'firstname', 'regionalrecruiter_id', 'unique_id', 'created_at', 'lastname', 'reactsum', 'newhirecatsum', 'is_contract_signed', 'calenderaccess', 'is_consultant', 'affid', 'worked', 'doctorcontact', 'experience', 'visited', 'recruiter', 'trainingpercentage', 'is_discovery', 'is_onboarding', '_id','parentname_s']; // use for Table Header Skip 

  editroute: any = 'usermanagement/edit';
  updateendpoint = 'addorupdatedata';             // updateendpoint is use for data update endpoint

  deleteendpoint = 'deletesingledata';            // deleteendpoint is use for data delete endpoint

  tablename = 'users';                            // this is a database collection name

  searchendpoint = 'datalist';                    // searchendpoint is use for data search endpoint

  // click_to_add_ananother_page = '/adminlist';      // use for click to another page routing path

  date_search_endpoint: any = 'datalist';           // date_search_endpoint is use for date search endpoint

  limitcond: any = {                                 // send basic limit data 
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };


  userdata_detail_skip: any = ['_id', 'created_at', 'fullname_s','reactsum','trainingpercentage','recruiter','parentname_s','status','parentname','newhirecatsum','lock','is_consultant','calenderaccess'];   // use for Table Detail Field Skip
  libdata: any = {
    updateendpoint: 'statusupdatesingledata',                                        // update endpoint set
    hideeditbutton: false,                                                  // (hide edit button)
    hidedeletebutton: true,                                               // (hide delete button)
    hideviewbutton: false,                                                 // (hide view button)
    hidestatustogglebutton: false,                                        // (hide status toggle button)
    hideaction: false,
    detailview_override: [
      { key: "is_contract_signed_m", val: "Contract signed" },
      { key: "is_discovery", val: "Discovery Call" },
      { key: "is_onboarding", val: "Onboarding Call" },
      { key: "created_datetime", val: "Date Added with time" },
      { key: "email", val: "Email" },
      { key: "type", val: "Account Type" },
      { key: "legaldoc_doctype", val: "Leagal doc submission"},
      { key: "fullname", val: "Name" },
      { key: "phoneno" , val: "Phone Number"}
    ], 
    updateendpointmany: 'update',
    deleteendpointmany: 'delete',                                                // (hide action column)

    tableheaders: ['fullname', 'phoneno', 'email', 'parentname', 'type', 'created_datetime', 'status' ], //not required (table header name)
    custombuttons: [
      {
        label: "delete",
        toggle: "delete",
        type: 'internallink',
      },
      {
        label: "Login As",
        route: "login-as-a-rep",
        type: 'internallink',
        param: ['_id', 'email']
      },
      {
        label: "Calender Access Inactive",
        route: "calender-access",
        type: 'internallink',
        param: ['_id', 'calenderaccess'],
        cond: 'calenderaccess',
        condval: 0
      },
      {
        label: "Calender Access Active",
        route: "calender-access",
        type: 'internallink',
        param: ['_id', 'calenderaccess'],
        cond: 'calenderaccess',
        condval: 1
      },
      {
        label: "Senior Consulting Director Inactive",
        route: "senior-consulting-director",
        type: 'internallink',
        param: ['_id', 'is_consultant'],
        cond: 'is_consultant',
        condval: 0
      },
      {
        label: "Senior Consulting Director Active",
        route: "senior-consulting-director",
        type: 'internallink',
        param: ['_id', 'is_consultant'],
        cond: 'is_consultant',
        condval: 1
      },
      {
        label: "Download Contract",
        link: "https://betoparedes.com/generate-pdf/employment-agreement/index.php",
        type: 'externallink',
        param: [{ key: '_id', q: 'id' }],
        cond: 'is_contract_signed_m',
        condval: 1
      },
      {
        label: "More Details",
        type: 'action',
        datatype: 'api',
        endpoint: 'getuserdatabyid',
        otherparam: [],
        //cond:'status',
        //condval:0,
        param: 'id',
        datafields: ['address', 'city', 'state', 'zip'],
        // refreshdata: true,
        headermessage: 'Address Details',
    }
    ]
  }

  sortdata: any = {
    "type": 'asc',                                              //  default sort data ascend and descend (desc)
    "field": 'fullname',                                          // default field for sorting
    "options": ['fullname', 'email','parentname','created_datetime']                                      //  sorting fields options for this table
  };

  date_search_source: any = 'users';                        // this is a database collection or view name

  datacollection: any = 'usertrainingreport';                           // data collection end point 

  date_search_source_count: any = 0;                                // variable declare and initialize for default counting data for source count

  authval: any = [
  ];

  // this is search block
  search_settings: any = {
    datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_datetime"}],   

    selectsearch:[{ label: 'Search By Type', field: 'type', values: this.type },{ label: 'Search By Status', field: 'status', values: this.status }],

    textsearch: [{ label: "Search By Full Name", field: 'fullname_s' }, { label: "Search By Email", field: 'email' }, { label: "Search By Parent Name", field: 'parentname_s' } , { label: "Search By Phone Number", field: 'phoneno' }],  // this is use for  text search
  };

  constructor(public commonservices: Commonservices, public cookieservice: CookieService, public originalCookie: CookieService, public _http: HttpClient, private router: Router, public modal: BsModalService, public _apiService: ApiService, public activatedRoute: ActivatedRoute) {

    this.activatedRoute.data.forEach((data: any) => {
      this.userdata = data.results.results.res;
    });

    this.datasource = '';
    let endpoint = 'usertrainingreport';                              // for main data endpoint
    let endpointc = 'usertrainingreport-count';                       // for count endpoint
    // data param for conditionlimit and search
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',                                           // defalut field sort type 
        "field": 'fullname'                                         // default sort field
      }

    }

    let link1 = this.commonservices.nodesslurl + endpointc;
    this._http.post(link1, data).subscribe((res: any) => {
      this.date_search_source_count = res.count;
    })





    this.fileurl = this.commonservices.serverfileurl;
    this.consultantrole = this.cookieservice.get('is_consultant'); //to know whether it is admin or senior consultant
    this.usertype = this.cookieservice.get('usertype');
    // this.getUserLists();
  }

  // getUserLists() {
  //   this.singleuserdata = [];
  //   this.loader = 1;
  //   let link: any;
  //   let data: any = {};
  //   link = this.commonservices.nodesslurl + 'trainingreport';
  //   if (this.consultantrole == null || this.consultantrole == 0) { //when admin accesses all reps' details
  //     data = {};
  //   }
  //   if (this.consultantrole != null && this.consultantrole == 1) { //when senior consultant accesses his reps' details
  //     data = { affid: this.cookieservice.get('userid') };
  //   }
  //   this._http.post(link, data)
  //     .subscribe(res => {
  //       let result;
  //       result = res;
  //       if (result.status == 'error') {
  //         console.log('Oopss');
  //       } else {
  //         if (result.data != null) {
  //           for (let i in result.data) {
  //             if (result.data[i].type == 'rep') {
  //               this.singleuserdata.push(result.data[i]);
  //               setTimeout(() => {
  //                 this.loader = 0;
  //               }, 1000);
  //             }

  //           }
  //         }
  //         if(result.data == null || result.data.length==0){
  //           this.loader = 0;
  //           this.singleuserdata = [];
  //         }


  //       }
  //     })
  // }

  ngOnInit() {
    // this.userdetails();
  }
  // userdetails() {
  //   const link = this.commonservices.nodesslurl + 'datalist?token=' + this.cookieservice.get('jwttoken');
  //   this._http.post(link, { source: 'rep_view', condition: { password: { $exists: true } } })
  //     .subscribe(res => {
  //       let result;
  //       result = res;
  //       this.singleuserdata = result.res;
  //     })
  // }

  // togglestatus(item: any) {
  //   this.loader = 1;
  //   let status: any;
  //   if (item.status != null) status = 1 - item.status;
  //   if (item.status == null) status = 1;
  //   const link = this.commonservices.nodesslurl + 'togglestatus?token=' + this.cookieservice.get('jwttoken');
  //   this._http.post(link, { id: item._id, source: 'users', status: status })
  //     .subscribe(res => {
  //       // this.getUserLists();
  //       this.loader = 0;
  //     }, error => {
  //       console.log('Oooops!');
  //       // this.getUserLists();
  //       this.loader = 0;
  //     });
  // }

  // // added by Himadri toggleSignUpMdStock




  // inActiveToggleSignUpMdStock(item: any) {


  //   this.loader = 1;
  //   if (item.ismdstoc != null && item.ismdstoc == 1) {
  //     item.ismdstoc = 1 - item.ismdstoc;
  //   }
  //   console.log('mdstock', item);
  //   let link = this.commonservices.nodesslurl + 'addorupdatedata?token=' + this.cookieservice.get('jwttoken');
  //   var linkMdstoc = this.commonservices.mdstockServerUrl + 'betoparedesbackendsignup';
  //   let dataMdstoc: any;
  //   dataMdstoc = {
  //     "email": item.email,
  //     "status": 0
  //   }

  //   this._http.post(linkMdstoc, { source: 'users', data: dataMdstoc }).subscribe(res => {
  //     console.log(res);
  //     let result: any;
  //     result = res;
  //     if (result.status == 'success') {

  //       this._http.post(link, { source: 'users', data: { id: item._id, ismdstoc: 0 } }).subscribe(res => {
  //         console.log(res);
  //         //  this.getUserLists();
  //         this.loader = 0;
  //       }, error => {
  //         console.log('Oooops!');
  //         // this.getUserLists();
  //         this.loader = 0;
  //       });

  //     }
  //   });
  // }


  // activeToggleSignUpMdStock(item: any) {
  //   console.log('mdstock', item);
  //   this.loader = 1;
  //   if (item.ismdstoc == null || item.ismdstoc == 0) {
  //     item.ismdstoc = 1;
  //   }
  //   let link = this.commonservices.nodesslurl + 'addorupdatedata?token=' + this.cookieservice.get('jwttoken');
  //   var linkMdstoc = this.commonservices.mdstockServerUrl + 'betoparedesbackendsignup';
  //   let showLink = this.commonservices.nodesslurl + 'datalist?token=' + this.cookieservice.get('jwttoken');

  //   this._http.post(showLink, { source: 'user_view', condition: { _id_object: item._id } }).subscribe(res => {
  //     let result: any;
  //     result = res;
  //     console.log(result.res[0], '++++++')

  //     let dataMdstoc: any;
  //     dataMdstoc = {

  //       "firstname": result.res[0].firstname,
  //       "lastname": result.res[0].lastname,
  //       "phone": result.res[0].telephone,
  //       "email": result.res[0].email,
  //       "state": result.res[0].state,
  //       "password": "admin",
  //       "status": 1,
  //       "type": "salesrep",
  //       "city": result.res[0].city,
  //       "zip": result.res[0].zip,
  //       "address": result.res[0].address
  //     }

  //     this._http.post(linkMdstoc, { source: 'users', data: dataMdstoc }).subscribe(res => {
  //       console.log(res);
  //       let result: any;
  //       result = res;
  //       if (result.status == 'success') {

  //         this._http.post(link, { source: 'users', data: { id: item._id, ismdstoc: 1 } }).subscribe(res => {
  //           console.log(res);
  //           //  this.getUserLists();
  //           this.loader = 0;
  //         }, error => {
  //           console.log('Oooops!');
  //           // this.getUserLists();
  //           this.loader = 0;
  //         });

  //       }
  //     });

  //   })



  // }

  // toggleCalenderAccess(item: any) {
  //   this.loader = 1;
  //   let calenderaccess: any;
  //   if (item.calenderaccess != null) calenderaccess = 1 - item.calenderaccess;
  //   if (item.calenderaccess == null) calenderaccess = 1;
  //   const link = this.commonservices.nodesslurl + 'addorupdatedata';
  //   this._http.post(link, { source: 'users', data: { id: item._id, calenderaccess: calenderaccess } })
  //     .subscribe(res => {
  //       // this.getUserLists();
  //       this.loader = 0;
  //     }, error => {
  //       console.log('Oooops!');
  //       this.loader = 0;
  //       // this.getUserLists();
  //     });
  // }

  // toggleConsultantRole(item: any) {
  //   this.loader = 1;
  //   let consultantrole: any;
  //   if (item.is_consultant != null) consultantrole = 1 - item.consultantrole;
  //   if (item.is_consultant == null) consultantrole = 1;
  //   const link = this.commonservices.nodesslurl + 'addorupdatedata';
  //   this._http.post(link, { source: 'users', data: { id: item._id, is_consultant: consultantrole } })
  //     .subscribe(res => {
  //       // this.getUserLists();
  //       this.loader = 0;
  //     }, error => {
  //       console.log('Oooops!');
  //       this.loader = 0;
  //       // this.getUserLists();
  //     });
  // }
  // searchbyval() {
  //   this.filterval = '';
  //   if (this.filterval1 != '' && this.filterval1 != null) {
  //     this.filterval = this.filterval1 + '|';
  //   }
  //   if (this.filterval2 != '' && this.filterval2 != null) {
  //     this.filterval = this.filterval2 + '|';
  //   }
  // }
  // deletdata(val: any, template: TemplateRef<any>) {
  //   this.modalRef = this.modal.show(template);
  //   this.selecteditem = val;
  // }
  // confirmdelete(template: TemplateRef<any>) {
  //   this.modalRef.hide();
  //   this.message = "Record deleted successfully!!";
  //   const link = this.commonservices.nodesslurl + 'deletesingledata?token=' + this.cookieservice.get('jwttoken');
  //   this._http.post(link, { source: 'users', id: this.selecteditem })
  //     .subscribe(res => {
  //       let result;
  //       result = res;
  //       // this.getUserLists();
  //       this.modalRef = this.modal.show(template, { class: 'successmodal' });
  //       setTimeout(() => {
  //         this.modalRef.hide();
  //       }, 4000);
  //     }, error => {
  //       console.log('Oooops!');
  //     });

  // }
  // nodelete() {
  //   this.modalRef.hide();
  // }
  // openModal(item: any, template: TemplateRef<any>, type: any) {
  //   this.eventtype = type;
  //   this.getEventDetails(item.email, type);
  //   this.modalRef = this.modal.show(template, { class: 'modal-md' });

  // }
  // getEventDetails(email: any, type: any) {
  //   this.eventList = [];
  //   const link = this.commonservices.nodesslurl + 'datalist?token=' + this.cookieservice.get('jwttoken');
  //   let data: any = {};
  //   if (type == 'Onboarding') {
  //     data = { source: 'googleevents_view', condition: { "emailid": email, "is_onboarding": true } };
  //   }
  //   if (type == 'Discovery') {
  //     data = { source: 'googleevents_view', condition: { "emailid": email, "is_discovery": true } };
  //   }
  //   this._http.post(link, data)
  //     .subscribe(res => {
  //       let result;
  //       result = res;
  //       for (let i in result.res) {
  //         if (result.res[i].eventdata != null) {
  //           this.eventList.push(result.res[i]);
  //         }
  //       }
  //     })
  // }

  // // added by himadri

  // getMedicaAaparchuniti(val: any, template: TemplateRef<any>) {
  //   this.modalRef = this.modal.show(template);
  //   this.medicaAaparchunitiValue = val;
  // }

  // // added by chandrani
  // getUserDetails(email: any) {
  //   let link = this.commonservices.nodesslurl + 'datalist?token=' + this.cookieservice.get('jwttoken');
  //   let data = { source: 'users', condition: { email: email } };
  //   this._http.post(link, data)
  //     .subscribe(res => {

  //       let originalcookiedata: any;
  //       originalcookiedata = this.cookieservice.getAll();
  //       this.cookieservice.set('oldcookie', JSON.stringify(originalcookiedata));
  //       let result: any; //originalCookie
  //       result = res;
  //       if (result.resc == 1 && result.res != null && result.res[0] != null) {
  //         if (result.res[0].status == 1) {


  //           this.cookieservice.set('jwttoken', this.cookieservice.get('jwttoken'));
  //           this.cookieservice.set('userid', result.res[0]._id);

  //           if (result.res[0].is_contract_signed == null && result.res[0].type == 'rep') {
  //             this.router.navigate(['/agreement']);
  //             return;
  //           }


  //           this.cookieservice.set('lockdornot', result.res[0].lock);
  //           this.cookieservice.set('usertype', result.res[0].type);
  //           this.cookieservice.set('useremail', result.res[0].email);
  //           this.cookieservice.set('is_consultant', result.res[0].is_consultant);
  //           this.cookieservice.set('calenderaccess', result.res[0].calenderaccess);
  //           this.cookieservice.set('fullname', result.res[0].firstname + ' ' + result.res[0].lastname);
  //           if (result.res[0].type == 'admin') {
  //             this.router.navigate(['/dashboard']);
  //           }
  //           if (result.res[0].type == 'regional_recruiter') {
  //             this.cookieservice.set('refreshtoken', result.res[0].refreshtoken);
  //             this.router.navigate(['/regionaldashboard']);
  //           }
  //           if (result.res[0].type == 'rep') {
  //             if (result.res[0].status == 0) {
  //               this.router.navigate(['/tempaccess']);
  //               return;
  //             }

  //             if (result.res[0].status == 1) {
  //               this.router.navigate(['/repdashboard']);
  //               return;
  //             }


  //             if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == null && result.res[0].reptraininglessonstep == null) this.router.navigate(['/contract']);
  //             if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == 1 && result.res[0].reptraininglessonstep == null) this.router.navigate(['/reptrainingcenter']);
  //             if (result.res[0].signup_step2 == 1 && result.res[0].contractstep == 1 && result.res[0].reptraininglessonstep == 1) this.router.navigate(['/repdashboard']);
  //           }
  //         }
  //       }
  //     })
  // }
}
