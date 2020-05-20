import { ApiService } from './../api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-contract-manager-list',
  templateUrl: './contract-manager-list.component.html',
  styleUrls: ['./contract-manager-list.component.css'],
  providers : [Commonservices]
})
export class ContractManagerListComponent implements OnInit {
  componentRef: any;
  datasource: any;
  status_gretterthan_zero: any;
  pendingapplication_view: any;
  joquuserlist: any;
  custombutton: any = { label: 'my tree', fields: ['type', 'name', '_id'], url: 'http://localhost:4200/affiliate-tree' };
  placeholder: any = ['placeholder'];
  type: any = ['text'];
  name: any = ['Username'];



  // use for Download the PDF

  custom_link: any = [{
      label: 'shatterblok',
      url: 'http://shatterblok.com/testpdf/html2pdf/shatterblok-agreement.php?id=',
      action: 'null'
  }, {
      label: 'Audiodateline',
      url: 'http://shatterblok.com/testpdf/html2pdf/audiodeadline-agreement.php?id=',
      action: 'null'
  }];


  contractmanagerlist: any = [];
  public requestby: any = [{ val: 'rep_name', name: 'Request By Rep'},{ val: 'lead_fullName', name: 'Request By Led'}]

  public status: any = [{ val: 'send_to_rep', name: 'Send To Rep' }, { val: 'send_to_lead', name: 'Send To Led' }, { val: 'sends_Signed_Contract_to_Rep', name: '	Ask For Modification' },{ val:2, name: 'Signed'},{ val:'request', name: 'Requested'}];

  // use for status search

  statusarray: any = [{ val: 'send_to_rep', name: 'Send To Rep' }, { val: 'send_to_lead', name: 'Send To Led' }, { val: 'sends_Signed_Contract_to_Rep', name: '	Ask For Modification' },{ val:2, name: 'Signed'},{ val:'request', name: 'Requested'}];

  // use for ststic email search
  //  Example like this
  emailarray: any = [{ val: 'sourotest222@gmail.com', name: 'sourotest222@gmail.com' }, { val: 'octtest@yopmail.com', name: 'octtest@yopmail.com' }, { val: 'septest@yopmail.com', name: 'septest@yopmail.com' }];

  // use for edit any field Navigate that page And you should be import the app-routing.module.ts   ex:- {path: 'editroute/:id', component: < "Write the class name"> },

  //  Example like this
  editroute: any = 'editroute';


  // use for Table Header modification 

  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {
      'date': "Date",
      'product': 'Product Name',
      'rep_name': 'Rep Name',
      'lead_fullName': "Lead Name",
      'contract_manager_name': "Contract Manager Name",
      'status': "Status",
      'created_by': "Request By",
      'notes': "Notes",
   
  };


  // use for Table Header Skip 
  contractmanagerlist_skip: any = ['_id', 'contract_manager_id', 'created_request_at', 'lead_id', 'product_id','rep_email','rep_id',];



  // use for Table Detail Field Skip
  contractmanagerlist_detail_skip: any = ['_id', 'contract_manager_id', 'created_request_at', 'lead_id', 'product_id','rep_email','rep_id',];


  // updateendpoint is use for data update endpoint
  updateendpoint = 'addorupdatedata';

  // deleteendpoint is use for data delete endpoint
  deleteendpoint = 'deletesingledata';

  // this is a database collection name
  tablename = 'users';

  // searchendpoint is use for data search endpoint
  searchendpoint = 'datalist';



  // date_search_endpoint is use for date search endpoint
  date_search_endpoint: any = 'datalist';
  // send basic limit data
  limitcond: any = {
      "limit": 10,
      "skip": 0,
      "pagecount": 1
  };

  // other data
  libdata: any = {
      updateendpoint: 'statusupdate',
      updateendpointmany: 'updateendpointmany',
      deleteendpointmany: 'deleteendpointmany',
      hideeditbutton: true,// all these button options are optional not mandatory
      hidedeletebutton: true,
      //hideviewbutton:false,
      hidestatustogglebutton: true,
      // hideaction:true,
      tableheaders: ['date', 'product', 'rep_name', 'lead_fullName', 'contract_manager_name', 'status', 'created_by', 'notes'], //not required
     
  }
  // send basic sort data
  sortdata: any = {
      "type": 'desc',
      "field": 'id',
      "options": [ 'id']
  };


  // this is a database collection or view name
  date_search_source: any = 'admin_blog_list';
  // datacollection
  datacollection: any = 'getcontractmanagerlist';
  //source count
  date_search_source_count: any = 0;

  search_settings: any = {

      datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at" }],   // this is use for  date search

      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status } , { label: 'Request By', field: 'status', values: this.requestby }], // this is use for  select search

      textsearch: [{ label: "Search By Name", field: 'product' }],  // this is use for  text search

  };

  // this is search block 



  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];


  constructor(public commonservices:Commonservices,
   public cookeiservice: CookieService,
    public _http:HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public modal: BsModalService,
    protected _sanitizer: DomSanitizer,
    public _apiService: ApiService) {

      this.datasource = '';
      let endpoint='getcontractmanagerlist'; // for main data endpoint
      let endpointc='getcontractmanagerlist-count'; // for count endpoint
      // data param for conditionlimit and search
      let data:any={
      "condition":{
      
      "limit":10,
      "skip":0
      },
      sort:{
      "type":'desc', // defalut field sort type
      "field":'id' // default sort field
      }
      
      }
      
      
      let link = this.commonservices.nodesslurl + endpoint;
      let link1 = this.commonservices.nodesslurl + endpointc;
      this._http.post(link, data)
      .subscribe((response:any) => {
      this.contractmanagerlist =response.results.res;
      console.warn('blogData',this.contractmanagerlist);
      })
      
      this._http.post(link1, data)
      .subscribe((res:any) => {
      console.log(res,' for count');
      this.date_search_source_count =res.count;
      })
      
     }

  ngOnInit() {


  }

}
