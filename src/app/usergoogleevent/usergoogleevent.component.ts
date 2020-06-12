// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-usergoogleevent',
//   templateUrl: './usergoogleevent.component.html',
//   styleUrls: ['./usergoogleevent.component.css']
// })
// export class UsergoogleeventComponent implements OnInit {
//   public sourcecondition: any;
//   public tabledatalist: any;
//   public sourcelimit: any = {};
//     constructor() {
//         this.sourcecondition = {};
//         this.tabledatalist = [
//           { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
//           { value: 'email', name: 'Email', role: 0, func: '', class: 'type', type: 'text' },
//           { value: 'startdate', name: 'Start Date', role: 0, func: '', class: 'type', type: 'text' },
//           { value: 'start', name: 'Start', role: 0, func: '', class: 'type', type: 'text' },
//           { value: 'end', name: 'End', role: 0, func: '', class: 'type', type: 'text' },
//           { value: 'insertedon', name: 'Insertedon ', role: 0, func: '', class: 'insertedon', type: 'unixTime' }
//         ];
//         this.sourcelimit = { 'skip':0, 'limit':10, 'page_count': 1};
//      }

//   ngOnInit() {
//   }

// }


import { ApiService } from './../api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Commonservices } from '../app.commonservices';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-usergoogleevent',
  templateUrl: './usergoogleevent.component.html',
  styleUrls: ['./usergoogleevent.component.css'],
  providers: [Commonservices],
})
export class UsergoogleeventComponent implements OnInit {
  // public sourcecondition: any;
  // public tabledatalist: any;
  // public sourcelimit: any = {};
  // datasource: any;

tabledata: any = [];
public datasource: any = '';

public status: any = [{ val: 0, 'name': 'Active' }, { val: 1, 'name': 'Inactive' }, { val: 3, 'name': 'Lock' }]; // use for status search

statusarray: any = [{val: 0, name: 'Active'}, {val: 1, name: 'Inactive'}, {val: 3, name: 'Lock'}]; // status name set

emailarray: any = [{val: 'sourotest222@gmail.com', name: 'sourotest222@gmail.com'}, {val: 'octtest@yopmail.com', name: 'octtest@yopmail.com'}, {val: 'septest@yopmail.com', name: 'septest@yopmail.com'}]; // Static Email search eg.

editroute: any = 'editroute'; // use for edit any field Navigate that page And you should be import the app-routing.module.ts ex:- {path: 'editroute/:id', component: < "Write the class name"> },

// use for Table Header modification
// Like Table head name is " firstname" => "First Name"
modify_header_array: any = {

  'start': 'Start',
  'end': 'End',
  'email': 'Email',
  'startdate': 'Start Date',
  'insertedon': 'Insertedon'
};

tabledata_header_skip: any = ['_id', 'lastreviewed', 'refreshtoken', 'type']; // use for Table Header Skip

tabledata_detail_skip: any = []; // use for Table Detail Field Skip

tabledata_detail_datatype: any = [{ // use for Table Detail inside the modal image path
key: 'images',
value: 'image',
fileurl: 'http://18.222.26.198/upload/brandimages/' // Image path
}];

updateendpoint = 'addorupdatedata'; // updateendpoint is use for data update endpoint

deleteendpoint = 'deletesingledata'; // deleteendpoint is use for data delete endpoint

tablename = 'users'; // this is a database collection name

searchendpoint = 'datalist'; // searchendpoint is use for data search endpoint

// click_to_add_ananother_page = '/adminlist'; // use for click to another page routing path

date_search_endpoint: any = 'datalist'; // date_search_endpoint is use for date search endpoint

limitcond: any = { // send basic limit data
'limit': 10,
'skip': 0,
'pagecount': 1
};

libdata: any = {
updateendpoint: 'statusupdate', // update endpoint set
hideeditbutton: false, // (hide edit button)
hidedeletebutton: false, // (hide delete button)
hideviewbutton: false, // (hide view button)
hidestatustogglebutton: false, // (hide status toggle button)
hideaction: true, // (hide action column)

tableheaders: [], // not required (table header name)
custombuttons: [
{
label: 'fb search with blog title', // fb search button name
link: 'https://www.facebook.com/search/top/', // fb search link
type: 'externallink', // external link
param: [{key: 'blogtitle', q: 'q'}], // passed parameter like https://www.facebook.com/search/top/?q=VPOTips%20You%20Should%20Know%20For%20Buying%20Used%20CarsWJY
},
{
label: 'G search with blog title ACtive', // google search button name
link: 'https://www.google.com/search', // google search link
type: 'externallink', // external link
param: [{key: 'blogtitle', q: 'q'}, {key: 'author', q: 'oq'}], // passed parameter like https://www.google.com/search?q=VPOTips%20You%20Should%20Know%20For%20Buying%20Used%20CarsWJY&oq=YmattZ
cond: 'status', // condition for status
condval: 0 // condition value status=0 , if value=1 and status =0 then the button will dissappear
}, {
label: 'mask blog', // mask blog search button name
link: 'https://mask-blog1.influxiq.com/blog-details', // mask search link
type: 'externallink', // external link
paramtype: 'angular', // showing front end
param: ['blogtitle', '_id'], // passed to parameter with blog title and id
cond: 'status', // condition for status
condval: 0 // condition value status=0 , if value=1 and status =0 then the button will dissappear
},
{
label: ' fb profile ', // fb profile button
link: 'https://www.facebook.com/debasiskar007', // profile link
type: 'externallink' // external link
},
{
label: ' fb profile for inactive', // fb profile for inactive status
link: 'https://www.facebook.com/debasiskar007', // profile link
type: 'externallink', // external link
cond: 'status', // condition for status
condval: 0 // condition value status=0 , if value=1 and status =0 then the button will dissappear
},
{
label: ' fb profile for active', // fb profile for active status
link: 'https://www.facebook.com/debasiskar007', // profile link
type: 'externallink', // external link
cond: 'status', // condition for status
condval: 1 // condition value status=1 if value=0 and status =1 then the button will dissappear
},
{
label: 'see brand', // see brand button
route: 'brand', // go to brand route
type: 'internallink', // same application but different page .
cond: 'status', // condition for status
condval: 0 // condition value status=0 , if value=1 and status =0 then the button will dissappear
},
{
label: 'see brand with param', // see brand button with param
route: 'brand', // go to brand route
type: 'internallink', // same application but different page with params .
cond: 'status', // condition for status
condval: 0, // condition value status=0 , if value=1 and status =0 then the button will dissappear
param: ['_id', 'blogtitle'], // passed with params
}
]
};

sortdata: any = {
'type': 'asc', // default sort data ascend and descend (desc)
'field': 'lastreviewed', // default field for sorting
'options': ['"lastreviewed" ," startdate"'] // sorting fields options for this table
};

date_search_source: any = 'admin_blog_list'; // this is a database collection or view name

datacollection: any = 'getadminusergoogleeventlistdata'; // data collection end point

date_search_source_count: any = 0; // variable declare and initialize for default counting data for source count

authval: any = [
];

// this is search block
search_settings: any = {

datesearch: [{startdatelabel: 'Start Date', enddatelabel: 'End Date', submit: 'Search', field: 'startdate'}], // this is use for date search //created at = field in res which gives date in unix format that changes to ist using moment.js

// selectsearch:[{ label: 'Search By Status', field: 'status', values: this.status }], // this is use for select search

textsearch: [{label: 'Search By Email', field: 'email'}], // this is use for text search

// search:[{label:"Search By Author",field:'author_search',values:this.authval}] // this is use for Autocomplete search
};




constructor(public _apiService: ApiService, public http: HttpClient, public commonservices: Commonservices) {
      this.datasource = '';
const endpoint = 'getadminusergoogleeventlistdata'; // for main data endpoint
const endpointc = 'getadminusergoogleeventlistdata-count'; // for count endpoint
// data param for conditionlimit and search
const data: any = {
'condition': {
'limit': 10,
'skip': 0
},
sort: {
'type': 'desc', // defalut field sort type
'field': 'lastreviewed' // default sort field
}

};

// const link = this.commonservices.nodesslurl+'getadmincommoneventlistdata';
// // this.http.post(link,{source:'legaldocuser_view'})
// this.http.post(link,{source:'user_regional_legaldoc_view'})
// .subscribe((response:any)=>{
// this.tabledata =response.results.res;
// console.warn('blogData',this.tabledata);
// })

const link = this.commonservices.nodesslurl + endpoint;
const link1 = this.commonservices.nodesslurl + endpointc;
this.http.post(link, data)
.subscribe((response: any) => {
this.tabledata = response.results.res;
console.warn('blogData', this.tabledata);
});

this.http.post(link1, data)
.subscribe((res: any) => {
console.log(res, ' for count');
this.date_search_source_count = res.count;
});

// this._apiService.postData1(endpoint,data).subscribe((response:any) => {
// // console.log('in constructor');
// console.log(response,' for table data');
// this.tabledata =response.results.res;
// console.warn('blogData',this.tabledata);

// }, error => {
// console.log('Oooops!');
// });
     }

  ngOnInit() {
  }

}
