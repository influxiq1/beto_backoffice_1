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
  products:any =[];

  



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
  public requestby: any = [{ val: 'N/A', name: 'Request By Rep'},{ val: 'lead', name: 'Request By Led'}]

  public status: any = [{ val: 'send_to_rep', name: 'Send To Rep' }, { val: 'send_to_lead', name: 'Send To Led' }, { val: 'ask_for_modification', name: 'Ask For Modification' },{ val:'sends_Signed_Contract_to_Rep', name: 'Signed'},{ val:'request', name: 'Requested'}];

  // use for status search

  statusarray: any = [{ val: 'send_to_rep', name: 'Send To Rep' }, { val: 'send_to_lead', name: 'Send To Led' }, { val: 'ask_for_modification', name: '	Ask For Modification' },{ val: 'sends_Signed_Contract_to_Rep', name: 'Signed'},{ val:'request', name: 'Requested'}];

  // use for ststic email search


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
  contractmanagerlist_skip: any = ['_id', 'contract_manager_id','contract_manager_name_s','rep_name_s','lead_name_s','created_by_s', 'created_request_at', 'lead_id', 'product_id','rep_email','rep_id',];



  // use for Table Detail Field Skip
  contractmanagerlist_detail_skip: any = ['_id', 'contract_manager_id','contract_manager_name_s','rep_name_s','lead_name_s','created_by_s', 'created_request_at', 'lead_id', 'created_by','product_id','rep_email','rep_id',];


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
      "limit": 10,
      "skip": 0,
      "pagecount": 1
  };

  // other data
  libdata: any = {
    detailview_override: [
        { key: "product", val: "Product Name" },
        { key: "rep_name", val: "Rep Name" },
        { key: "lead_fullName", val: "Lead Name" },
        { key: "contract_manager_name", val: "Contract Manager Name" },
        { key: "by", val: "Request By" },
        { key: "notes", val: "Notes" },
        { key: "status", val: "Status" },
        { key: "date", val: "Date" },
    ],
      updateendpoint: 'statusupdate',
      updateendpointmany: 'updateendpointmany',
      deleteendpointmany: 'deleteendpointmany',
      hideeditbutton: true,// all these button options are optional not mandatory
      hidedeletebutton: false,
      //hideviewbutton:false,
      hidestatustogglebutton: true,
      // hideaction:true,
      tableheaders: ['date', 'product', 'rep_name', 'lead_fullName', 'contract_manager_name', 'status', 'created_by', 'notes'], //not required
      custombuttons: [
       
        {
            label: "downLoad",
            link: "https://api.influxhostserver.com/download?file=contract_report_5e9490c6b00d40015cc43e12.pdf",
            type: 'externallink',
            paramtype: 'angular',
            //param: ['_id'],
            cond:'status',
            condval: 'sends_Signed_Contract_to_Rep'
        }
 
    ]
     
  }
  // send basic sort data
  sortdata: any = {
      "type": 'desc',
      "field": 'id',
      "options": ['id']
  };


  // this is a database collection or view name
  date_search_source: any = 'contract_repote';
  // datacollection
  datacollection: any = 'getcontractmanagerlist';
  //source count
  date_search_source_count: any = 0;

  search_settings: any = {

      datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_request_at" }],   // this is use for  date search

      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status } , { label: 'Request By', field: 'by', values: this.requestby } , { label: 'Search By Products', field: 'product_id', values: this.products }], // this is use for  select search

      textsearch: [{ label: "Search By Name", field: 'contract_manager_name_s' }],  // this is use for  text search

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

      // Product List

      let product_endpoint = 'datalist'; 
      let dataa: any = {
          "source": "products",
          "condition": {
              "status": true
          }
      
        
  
      }
      this._apiService.getDataforAdminList(product_endpoint, dataa).subscribe((res: any) => {
        // console.log('in constructor');
         console.log(res.res[9]);
                   for(let i=0;i<res.res.length; i++) {
          this.products.push(
            { 'val': res.res[i]._id, 'name':res.res[i].productname}
          );
        }
       // this.products = res.results.res;
        console.warn('blogData',this.products);
  
    }, error => {
        console.log('Oooops!');
    });
    
      
     }

     

  ngOnInit() {


  }

}
