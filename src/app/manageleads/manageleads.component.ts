import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Commonservices } from '../app.commonservices';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../api.service';
import { Router } from '@angular/router';
import { BsModalService } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-manageleads',
  templateUrl: './manageleads.component.html',
  styleUrls: ['./manageleads.component.css'],
  providers: [Commonservices],
})
export class ManageleadsComponent implements OnInit {
  public formdata: any;
  // public datasource: any;
  public manageleadslist: any[];
  public sourcecondition: any = {};
  public sourcelimit: any = {};
  public hideaddval: any = false;

  manageleads: any = [];
  public datasource: any = '';

  statusarray: any = [{ val: 0, 'name': 'Active' }, { val: 1, 'name': 'Inactive' }]; // use for status search

  //statusarray: any = [{ val: '', name: '' }, { val: 'seen', name: 'Seen' }, { val: 'send', name: 'Email Send' }]; //status name set

  //emailarray: any = [{val: 'sourotest222@gmail.com', name: 'sourotest222@gmail.com'}, {val: 'octtest@yopmail.com', name: 'octtest@yopmail.com'}, {val: 'septest@yopmail.com', name: 'septest@yopmail.com'}]; //Static Email search eg.

  editroute: any = 'manage-leads/edit/'; // use for edit any field Navigate that page And you should be import the app-routing.module.ts ex:- {path: 'editroute/:id', component: < "Write the class name"> },

  // use for Table Header modification
  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {

    'fullname': "Full name",
    'company': "Company",
    'website': "Website",
    'email': "Email Id",
    'phoneno': "Phone No",
    'mobile': "Mobile No",
    'address': "Address",
    'only_productname': "Products",
    'status': "Status",
    'emailStatus': "Manage Notes"
  };

  manageleads_header_skip: any = ['_id', 'appointment_count', 'created_at', 'created_by', 'date', 'firstname', 'lastname', 'mobile', 'notescount', 'pricepoint', 'product', 'rep_name', 'youtube', 'productname']; // use for Table Header Skip

  manageleads_detail_skip: any = ['_id','created_by','product','productname','created_at','rep_name','only_productname']; // use for Table Detail Field Skip
  updateendpoint = 'addorupdatedata'; // updateendpoint is use for data update endpoint

  deleteendpoint = 'deletesingledata'; // deleteendpoint is use for data delete endpoint

  tablename = 'leads'; // this is a database collection name

  searchendpoint = 'datalist'; // searchendpoint is use for data search endpoint

  // click_to_add_ananother_page = '/adminlist'; // use for click to another page routing path

  date_search_endpoint: any = 'datalist'; // date_search_endpoint is use for date search endpoint

  limitcond: any = { // send basic limit data
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };
  public libdata: any = {};
  

  sortdata: any = {
    "type": 'asc', // default sort data ascend and descend (desc)
    "field": 'fullname', // default field for sorting
    "options": ['fullname'] // sorting fields options for this table
  };

  date_search_source: any = 'leads'; // this is a database collection or view name

  datacollection: any = 'getleadsmanagelistdata'; // data collection end point

  date_search_source_count: any = 0; // variable declare and initialize for default counting data for source count

  authval: any = [
  ];

  // this is search block
  search_settings: any = {

    datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at" }], // this is use for date search //created at = field in res which gives date in unix format that changes to ist using moment.js

    textsearch: [{ label: "Search By Name", field: 'fullname' }, { label: "Search By Email", field: 'email' }], // this is use for text search


  };


  constructor(public commonservices: Commonservices, public cookieservice: CookieService, public originalCookie: CookieService, public _http: HttpClient, private router: Router, public modal: BsModalService, public _apiService: ApiService) {
    this.libdata = {
      detailview_override: [
        { key: "firstname", val: "First Name" },
        { key: "lastname", val: "Last Name" },
        { key: "fullname", val: "Full Name" },
        { key: "status", val: "Status" },
        { key: "company", val: "Company" },
        { key: "website", val: "Web site" },
        { key: "mobile", val: "Mobile No" },
        { key: "email", val: "Email Id" },
        { key: "address", val: "Address" },
        { key: "phoneno", val: "Phone No" },
        { key: "date", val: "Date" },
    ], // optional
      updateendpoint: 'statusupdate', // update endpoint set
      hideeditbutton: false, // (hide edit button)
      hidedeletebutton: false, // (hide delete button)
      hideviewbutton: false, // (hide view button)
      hidestatustogglebutton: false, // (hide status toggle button)
      hideaction: false, // (hide action column)
  
      tableheaders: ['fullname', 'company', 'website', 'email', 'phoneno', 'mobile', 'address', 'only_productname','status','emailStatus'], //not required (table header name)
      custombuttons: [
        {
          label: "Discovery Call", //  button name
          link: "#", //  link
          type: 'internallink', // internallink link
          //param:[{key:'blogtitle',q:'q'}], // passed parameter 
        },
        {
          label: " Send Contract Review Video ", //  button name
          link: "#", // profile link
          type: 'internallink' // internallink link
        },
        {
          label: " Send Marketing Review Video ", //  button name
          link: "#", // profile link
          type: 'internallink' // internallink link
        }
  
      ]
    }
    // if (this.cookieservice.get('usertype') != 'admin') {
    //   this.libdata.basecondition = {created_by: ''} 
    // }else{
    //   this.libdata.basecondition = {created_by: this.cookieservice.get('userid') } 
    // }
    this.libdata.basecondition = (this.cookieservice.get('usertype') != 'admin') ? { created_by: this.cookieservice.get('userid') } : { created_by: '' }
  

console.log(this.libdata,'--------------------------------')

    this.datasource = '';
    let endpoint = 'getleadsmanagelistdata'; // for main data endpoint
    let endpointc = 'getleadsmanagelistdata-count'; // for count endpoint
    // data param for conditionlimit and search
    let data: any = {
      "condition": {

        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'asc', // defalut field sort type
        "field": 'fullname' // default sort field
      }

    }
    data.created_by = (this.cookieservice.get('usertype') != 'admin') ? this.cookieservice.get('userid') : '';
    // console.log(data);


    let link = this.commonservices.nodesslurl + endpoint;
    let link1 = this.commonservices.nodesslurl + endpointc;
    this._http.post(link, data)
      .subscribe((response: any) => {
        this.manageleads = response.results.res;
        console.warn('blogData', this.manageleads);
      })

    this._http.post(link1, data)
      .subscribe((res: any) => {
        console.log(res, ' for count');
        this.date_search_source_count = res.count;
      });
  }

  ngOnInit() {
  }

}