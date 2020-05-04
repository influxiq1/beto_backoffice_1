import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Commonservices } from '../app.commonservices';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [Commonservices]
})
export class ProductsComponent implements OnInit {
  public formdata: any;
  public datasource: any;
  public tabledatalist: any[];
  public sourcecondition: any = {};

  product_list: any = [];
  // public datasource: any = '';

  public status: any = [{ val: true, 'name': 'Active' }, { val: false, 'name': 'Inactive' }];   // use for status search

  statusarray: any = [{ val: true, name: 'Active' }, { val: false, name: 'Inactive' }];  //status name set
  
 
  modify_header_array: any = {
    'type': 'Type',
    'id': 'ID',
    'productname': 'Product Name',
    'description': 'Description',
    'launch_date': '',
    'status': 'Status',
    'verification_need': 'Verification Needed'

  };

  tabledata_header_skip: any = ['id', 'multiple_emails', 'not_launch',  'unique_id', 'created_at', '_id']; // use for Table Header Skip 

  tabledata_detail_skip: any = [];   // use for Table Detail Field Skip

  

  updateendpoint = 'addorupdatedata';             // updateendpoint is use for data update endpoint

  deleteendpoint = 'deletesingledata';            // deleteendpoint is use for data delete endpoint

  tablename = 'products';                            // this is a database collection name

  searchendpoint = 'datalist';                    // searchendpoint is use for data search endpoint

  // click_to_add_ananother_page = '/adminlist';      // use for click to another page routing path

  date_search_endpoint: any = 'datalist';           // date_search_endpoint is use for date search endpoint

  limitcond: any = {                                 // send basic limit data 
    "limit": 10,
    "skip": 0,
    "pagecount": 1
  };

  libdata: any = {
    updateendpoint: 'statusupdate',                  // update endpoint set
    // hideeditbutton: true,                           // (hide edit button)
    hidedeletebutton: false,                         // (hide delete button)
    hideviewbutton: true,                          // (hide view button)
    hidestatustogglebutton: true,                  // (hide status toggle button)
    hideaction: false,                              // (hide action column)

    tableheaders: ['productname', 'description', 'launch_date', 'state', 'verification_need'], //not required (table header name)
    custombuttons: []
  }

  sortdata: any = {
    "type": 'asc',                                              //  default sort data ascend and descend (desc)
    "field": 'productname',                                         // default field for sorting
    "options": ['productname']     //  sorting fields options for this table
  };

  date_search_source: any = 'products';                     // this is a database collection or view name

  datacollection: any = 'getproductsmanagelistdata';                    // data collection end point 

  date_search_source_count: any = 0;                               // variable declare and initialize for default counting data for source count

  authval: any = [
  ];

  // this is search block
  search_settings: any = {

    //  datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search",  field:"created_at"}],   // this is use for  date search //created at = field in res which gives date in unix format that changes to ist using moment.js

    //selectsearch:[{ label: 'Search By Status', field: 'status', values: this.status }], // this is use for  select search

    productsearch: [{ label: "Search By Product", field: 'productname', submit: "Search" }],  // this is use for  text search

    //search:[{label:"Search By Author",field:'author_search',values:this.authval}]     // this is use for  Autocomplete search
  };



  constructor(public _apiService: ApiService, public http: HttpClient, public commonservices: Commonservices) {
    //   this.tabledatalist = [
    //   { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
    //   // { value: 'multiple_emails', name: 'Emails', role: 0, func: '', class: 'multiple_emails', type: 'text' },
    //   { value: 'productname', name: 'Product Name', role: 0, func: '', class: 'productname', type: 'text' },
    //   { value: 'description', name: 'Description', role: 0, func: '', class: 'description', type: 'text' },
    //   { value: 'not_launch', name: 'Launch', role: 0, func: '', class: 'not_launch', type: 'checkbox' },
    //   {value:'status',name:'Status',role:0,func:'',class:'status',type:'checkbox',editrole:['admin']},
    //   {value:'verification_need',name:'Verification Needed',role:0,func:'',class:'verification_need',type:'checkbox',editrole:['']},
    // ];

    this.datasource = '';
    let endpoint = 'getproductsmanagelistdata';                              // for main data endpoint
    let endpointc = 'getproductsmanagelistdata-count';                       // for count endpoint
    // data param for conditionlimit and search
    let data: any = {
      "condition": {
        "limit": 10,
        "skip": 0
      },
      sort: {
        "type": 'desc',                                           // defalut field sort type 
        "field": 'productname'                                         // default sort field
      }

    }

    let link = this.commonservices.nodesslurl + endpoint;
    let link1 = this.commonservices.nodesslurl + endpointc;
    this.http.post(link, data)
      .subscribe((response: any) => {
        for (let i=0; i<response.results.res.length; i++) {
          let temp: any = {};
          temp['productname'] = response.results.res[i].productname;
          temp['description'] = response.results.res[i].description;
          temp['launch_date'] = response.results.res[i].launch_date;
          temp['state'] = response.results.res[i].status ? 'Active' : 'Inactive';
          temp['verification_need'] = response.results.res[i].verification_need ? 'not required' : 'Required';

          this.product_list.push(temp);
        }
        // this.product_list = response.results.res;
        console.warn('blogData', this.product_list);
      })

    this.http.post(link1, data)
      .subscribe((res: any) => {
        console.log(res, ' for count');
        this.date_search_source_count = res.count;
      })



    this.formdata = [
      { inputtype: 'text', name: 'productname', label: 'Product Name', placeholder: 'Enter Product Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'textarea', name: 'description', label: 'description', placeholder: 'Enter Description' },
      { inputtype: 'checkbox', name: 'status', label: 'Status', value: false },
      { inputtype: 'checkbox', name: 'not_launch', label: 'Not Launched', value: false },
      { inputtype: 'dateis', name: 'launch_date', label: "Launch Date" },
      { inputtype: 'checkbox', name: 'verification_need', label: 'Verification Needed', value: false },
      { inputtype: 'text', name: 'multiple_emails', label: 'Emails', placeholder: 'Enter Emails' },
    ];
    // this.datasource = { table: 'products', objarr: [] }; 
  }
  ngOnInit() {
  }

}