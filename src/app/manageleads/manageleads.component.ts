import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Commonservices } from '../app.commonservices';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './../api.service';

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

//public status: any = [{ val: 0, 'name': 'Active' }, { val: 1, 'name': 'Inactive' }, { val: 3, 'name': 'Lock' }]; // use for status search

statusarray: any = [{val:'', name: ''}, {val: 'seen', name: 'Seen'}, {val: 'send', name: 'Email Send'}]; //status name set

//emailarray: any = [{val: 'sourotest222@gmail.com', name: 'sourotest222@gmail.com'}, {val: 'octtest@yopmail.com', name: 'octtest@yopmail.com'}, {val: 'septest@yopmail.com', name: 'septest@yopmail.com'}]; //Static Email search eg.

editroute: any = 'editroute'; // use for edit any field Navigate that page And you should be import the app-routing.module.ts ex:- {path: 'editroute/:id', component: < "Write the class name"> },

// use for Table Header modification
// Like Table head name is " firstname" => "First Name"
modify_header_array: any = {
  
  'fullname':"Full name",
  'company':"Company",
  'website':"Website",
  'email':"Email Id",
  'phoneno':"Phone No",
  'mobile':"Mobile No",
  'address': "Address" ,
  'only_productname':"Products",
  'emailStatus':"Manage Notes"
};

manageleads_header_skip: any = ['_id','appointment_count','created_at','created_by','date','firstname','lastname','mobile','notescount','pricepoint','product','rep_name','status','youtube','productname']; // use for Table Header Skip

manageleads_detail_skip: any = []; // use for Table Detail Field Skip

// manageleads_detail_datatype: any = [{ // use for Table Detail inside the modal image path
// key: "images",
// value: 'image',
// fileurl: "http://18.222.26.198/upload/brandimages/" // Image path
// }];

updateendpoint = 'addorupdatedata'; // updateendpoint is use for data update endpoint

deleteendpoint = 'deletesingledata'; // deleteendpoint is use for data delete endpoint

tablename = 'leads'; // this is a database collection name

searchendpoint = 'datalist'; // searchendpoint is use for data search endpoint

// click_to_add_ananother_page = '/adminlist'; // use for click to another page routing path

date_search_endpoint: any='datalist'; // date_search_endpoint is use for date search endpoint

limitcond:any={ // send basic limit data
"limit":10,
"skip":0,
"pagecount":1
};

libdata:any={
updateendpoint:'statusupdate', // update endpoint set
hideeditbutton:false, // (hide edit button)
hidedeletebutton:false, // (hide delete button)
hideviewbutton:true, // (hide view button)
hidestatustogglebutton:true, // (hide status toggle button)
hideaction:false, // (hide action column)

tableheaders:['fullname','company','website','email','phoneno','mobile','address','only_productname','emailStatus'], //not required (table header name)
custombuttons:[
{
label:"Discovery Call", //  button name
link:"#", //  link
type:'internallink', // internallink link
//param:[{key:'blogtitle',q:'q'}], // passed parameter 
},
{
label:" Send Contract Review Video ", //  button name
link:"#", // profile link
type:'internallink' // internallink link
},
{
  label:" Send Marketing Review Video ", //  button name
  link:"#", // profile link
  type:'internallink' // internallink link
  }

]
}


sortdata:any={
"type":'asc', // default sort data ascend and descend (desc)
"field":'fullname ', // default field for sorting
"options":['fullname'] // sorting fields options for this table
};

date_search_source: any='leads'; // this is a database collection or view name

datacollection: any='getleadsmanagelistdata'; // data collection end point

date_search_source_count: any=0; // variable declare and initialize for default counting data for source count

authval:any= [
];

// this is search block
search_settings:any={

datesearch:[{startdatelabel:"Start Date",enddatelabel:"End Date",submit:"Search", field:"created_at"}], // this is use for date search //created at = field in res which gives date in unix format that changes to ist using moment.js

textsearch:[{label:"Search By Name",field:'fullname'},{label:"Search By Email",field:'email'}], // this is use for text search


};


  constructor(public cookieservice: CookieService,public _apiService: ApiService, public http:HttpClient,public commonservices:Commonservices) {
    this.formdata = [
      { inputtype: 'text', name: 'firstname', label: 'First Name', placeholder: 'Enter First Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'text', name: 'lastname', label: 'Last Name', placeholder: 'Enter Last Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'text', name: 'company', label: 'Company ', placeholder: 'Enter Company Name', validationrule: { required: true }, validationerrormsg: 'is required' },
      { inputtype: 'email', name: 'email', label: 'Email Id(s)', placeholder: 'Enter Your Email (Put multiple values in , separated)', validationrule: { required: true, email: true }, validationerrormsg: 'is required and should be valid' },
      { inputtype: 'textarea', name: 'address', label: 'Address', placeholder: 'Enter Address' },
      { inputtype: 'text', name: 'phoneno', label: 'Phone No.', placeholder: 'Enter Mobile Number' },
      { inputtype: 'text', name: 'website', label: 'Website Url.', placeholder: 'Enter Website Url ' },
      { inputtype: 'text', name: 'mobile', label: 'Mobile No.', placeholder: 'Enter Mobile No ' },
      {inputtype:'select',name:'product',label:'Products',defaultchoice:'Select a Product',sourceview:{source:'null','condition':{'userid':this.cookieservice.get('userid')}},multiple:true,selectvalue:'product_name',selectid:'product',validationrule:{required:true},validationerrormsg:'is required'},
      // {inputtype:'select',name:'product',label:'Products',defaultchoice:'Select a Product',sourceview:'products',multiple:true,selectvalue:'productname',selectid:'_id',validationrule:{required:true},validationerrormsg:'is required'},
      { inputtype: 'hidden', name: 'status', label: "status", placeholder: "status", value: 'Pending' },
      { inputtype: 'hidden', name: 'created_by', label: "created_by", placeholder: "Created By", value: this.cookieservice.get('userid') }
    ];

    this.datasource = '';
let endpoint='getleadsmanagelistdata'; // for main data endpoint
let endpointc='getleadsmanagelistdata-count'; // for count endpoint
// data param for conditionlimit and search
let data:any={
"condition":{

"limit":10,
"skip":0
},
sort:{

"type":'desc', // defalut field sort type
"field":'fullname' // default sort field
}

}


let link = this.commonservices.nodesslurl + endpoint;
let link1 = this.commonservices.nodesslurl + endpointc;
this.http.post(link, data)
.subscribe((response:any) => {
this.manageleads =response.results.res;
console.warn('blogData',this.manageleads);
})

this.http.post(link1, data)
.subscribe((res:any) => {
console.log(res,' for count');
this.date_search_source_count =res.count;
})
    // this.datasource = { table: 'leads', objarr: ["created_by"] };
    // this.sourcelimit = { 'skip':0, 'limit':10, 'page_count': 1};
    // if (this.cookieservice.get('usertype') == 'admin' ) {
    //   this.sourcecondition = {};
    //   this.hideaddval = true;
    //   this.tabledatalist = [
    //     { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
    //     { value: 'fullname', name: 'Full Name', role: 0, func: '', class: 'fullname', type: 'text', searchval:true },
    //     // { value: 'lastname', name: 'Last Name', role: 0, func: '', class: 'lastname', type: 'text' },
    //     { value: 'company', name: 'Company ', role: 0, func: '', class: 'company', type: 'text' },
    //     { value: 'website', name: 'Website ', role: 0, func: '', class: 'website', type: 'text' },
    //     { value: 'email', name: 'Email Id', role: 0, func: '', class: 'email', type: 'text', searchval:true },
    //     { value: 'phoneno', name: 'Phone No', role: 0, func: '', class: 'phone', type: 'phoneno' },
    //     { value: 'mobile', name: 'Mobile No', role: 0, func: '', class: 'mobile', type: 'phoneno' },
    //     { value: 'address', name: 'Address', role: 0, func: '', class: 'address', type: 'text' },
    //     { value: 'only_productname', name: 'Products ', role: 0, func: '', class: 'productname', type: 'text' },
    //     { value: 'rep_name', name: 'Rep Details', role: 0, func: '', class: 'fullname', type: 'text' },
    //     {value: 'status', name: 'Status',defaultchoice:'Pending',optionlist:[{value:'Pending',name:'Pending'},{value:'Closed',name:'Closed'},{value:'No Sale',name:'No Sale'}], role: 0, func: '', class: 'status', type: 'select'},
        
    //   ];
    // } else {
    //   this.sourcecondition = { 'created_by_object': this.cookieservice.get('userid') };
    //   this.hideaddval = false;

    //  if(this.cookieservice.get('usertype') ==  'regional_recruiter'){
    //   this.tabledatalist = [
    //     { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
    //     { value: 'fullname', name: 'Full Name', role: 0, func: '', class: 'fullname', type: 'text' },
    //     // { value: 'lastname', name: 'Last Name', role: 0, func: '', class: 'lastname', type: 'text' },
    //     { value: 'company', name: 'Company ', role: 0, func: '', class: 'company', type: 'text' },
    //     { value: 'website', name: 'Website ', role: 0, func: '', class: 'website', type: 'text' },
    //     { value: 'email', name: 'Email Id', role: 0, func: '', class: 'email', type: 'text' },
    //     { value: 'phoneno', name: 'Phone No', role: 0, func: '', class: 'phone', type: 'phoneno' },
    //     { value: 'mobile', name: 'Mobile No', role: 0, func: '', class: 'mobile', type: 'phoneno' },
    //     { value: 'address', name: 'Address', role: 0, func: '', class: 'address', type: 'text' },
    //     { value: 'only_productname', name: 'Products ', role: 0, func: '', class: 'productname', type: 'text' },
    //     // {value: 'status', name: 'Status',defaultchoice:'Pending',optionlist:[{value:'Pending',name:'Pending'},{value:'Closed',name:'Closed'},{value:'No Sale',name:'No Sale'}], role: 0, func: '', class: 'status', type: 'select'}
    //   ];
    //  }else{
    //    this.tabledatalist = [
    //   { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
    //   { value: 'fullname', name: 'Full Name', role: 0, func: '', class: 'fullname', type: 'text' },
    //   // { value: 'lastname', name: 'Last Name', role: 0, func: '', class: 'lastname', type: 'text' },
    //   { value: 'company', name: 'Company ', role: 0, func: '', class: 'company', type: 'text' },
    //   { value: 'website', name: 'Website ', role: 0, func: '', class: 'website', type: 'text' },
    //   { value: 'email', name: 'Email Id', role: 0, func: '', class: 'email', type: 'text' },
    //   { value: 'phoneno', name: 'Phone No', role: 0, func: '', class: 'phone', type: 'phoneno' },
    //   { value: 'mobile', name: 'Mobile No', role: 0, func: '', class: 'mobile', type: 'phoneno' },
    //   { value: 'address', name: 'Address', role: 0, func: '', class: 'address', type: 'text' },
    //   { value: 'only_productname', name: 'Products ', role: 0, func: '', class: 'productname', type: 'text' },
    //   // { value: 'status', name: 'Status', role: 0, func: '', class: 'address', type: 'text' }
    // ];}
    
    // }
  }

  ngOnInit() {
  }

}