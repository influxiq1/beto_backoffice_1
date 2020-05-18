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

  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];

  // use for status search

  statusarray: any = [{ val: 1, name: 'Approve' }, { val: 4, name: 'Decline' }, { val: 3, name: 'Lock' }];

  // use for ststic email search
  //  Example like this
  emailarray: any = [{ val: 'sourotest222@gmail.com', name: 'sourotest222@gmail.com' }, { val: 'octtest@yopmail.com', name: 'octtest@yopmail.com' }, { val: 'septest@yopmail.com', name: 'septest@yopmail.com' }];

  // use for edit any field Navigate that page And you should be import the app-routing.module.ts   ex:- {path: 'editroute/:id', component: < "Write the class name"> },

  //  Example like this
  editroute: any = 'editroute';


  // use for Table Header modification 

  // Like Table head name is " firstname" => "First Name"
  modify_header_array: any = {
      'firstname': "Date",
      'email': 'Product Name',
      'lastname': 'Rep Name',
      'name': "Lead Name",
      'blogtitle': "Contract Manager Name",
      "created_datetime": "Status",
      "created_date": "Request By",
      "author": "Notes",
   
  };


  // use for Table Header Skip 
  contractmanagerlist_skip: any = ['_id'];



  // use for Table Detail Field Skip
  //contractmanagerlist_detail_skip: any = ['_id', 'email', 'name', 'blogtitle', 'Blogs image'];


  // updateendpoint is use for data update endpoint
  updateendpoint = 'addorupdatedata';

  // deleteendpoint is use for data delete endpoint
  deleteendpoint = 'deletesingledata';

  // this is a database collection name
  tablename = 'users';

  // searchendpoint is use for data search endpoint
  searchendpoint = 'datalist';

  // use for click to another page routing path
  click_to_add_ananother_page = '/adminlist';



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
      tableheaders: ['firstname', 'email', 'lastname', 'name', 'blogtitle', 'created_datetime', 'created_date', 'author'], //not required
     
  }
  // send basic sort data
  sortdata: any = {
      "type": 'desc',
      "field": 'author',
      "options": [ 'author']
  };


  // this is a database collection or view name
  date_search_source: any = 'admin_blog_list';
  // datacollection
  datacollection: any = 'getadminbloglistdata';
  //source count
  date_search_source_count: any = 0;

  search_settings: any = {

      datesearch: [{ startdatelabel: "Start Date", enddatelabel: "End Date", submit: "Search", field: "created_at" }],   // this is use for  date search

      selectsearch: [{ label: 'Search By Status', field: 'status', values: this.status }], // this is use for  select search

      textsearch: [{ label: "Search By Name", field: 'blogtitle_search' }],  // this is use for  text search

  };

  // this is search block 



  brandarray: any = [];
  notpendingapplication_view: any = [];
  adminlist: any = [];



//   public d:any = new Date();
//   public loader = 0;
//   public total_count=0;
//   daterangepickerOptions = {
//     format: 'MM/DD/YYYY',
//     minDate: moment().format("MM/DD/YYYY"),
//     noDefaultRangeSelected: true
// }
// bsDatepicker = {
//     format: 'MM/DD/YYYY',
//     minDate: moment().format("MM/DD/YYYY"),
//     noDefaultRangeSelected: true
// }
//   modalRef1: BsModalRef;

// public datalist: any;
// public selecteditem;
// public placeholderforselect = 0; 
// public placeholderforselectStatus = 0; 
// public message;
//  headElements = ['ID', 'Date', 'Product Name', 'Rep Name', 'Lead Name', 'Contract Manager Name', 'Status','Request By', 'Notes'];
// public productList: any = [];
// public statusList: any = [{val:'send_to_rep', name:"Send To Rep"},{val:'ask_for_modification',name:'Ask For Modification'},{val:'send_to_lead',name:'Send To Lead'},{val:'sends_Signed_Contract_to_Rep',name:'Signed'},{val:'request',name:'Request'}];
// public prodSelect: any = 0;
// public statusSelect: any = 0;
// public requestBy: any = 0;
// public filterValForName: any;
// public filterval5: any = '';
// public start_date: any = '';
// public end_date: any = '';
// public notes_list: any = '';
// public indexCount: number;
// public sourcelimit: any = {"skip":0,"limit":10,"page_count":1};
// public dataListCount: any = '';
// public dataListPageCount: any = '';
// public sourceDetails: any = {
//   "source":'contract_manager_list',
//   "sourcecondition":{}
// }

  constructor(public commonservices:Commonservices,
   public cookeiservice: CookieService,
    public _http:HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public modal: BsModalService,
    protected _sanitizer: DomSanitizer,
    public _apiService: ApiService) {

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
      "type":'asc', // defalut field sort type
      "field":'fullname' // default sort field
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

//     this.route.data.forEach((data:any ) => {
//       // this.datalist = data.results.res;
//       console.log(data.results.res);
//       let dataall: any = [];
//       for (let item in data.results.res) {
//         if (data.results.res[item].status == 'asDraft' && data.results.res[item].rep_id != this.cookeiservice.get('userid')) {
//           data.results.res.splice(item,1)
//           // console.log('asDraft', item)
//         } else{
//           dataall.push(data.results.res[item])
//           // if (this.d.setDate(this.d.getDate()-3 >= data.results.res[item].created_request_at)) {
//           //   console.log(this.d.setDate(this.d.getDate()-3 <= data.results.res[item].created_request_at))
//           // }
//         }
        
//       }
//       this.datalist = dataall;
//    });
//    console.log((this.datalist[0].contentTop));

//   this.getDataListCount();

//    this.getproduct();
//   }
//   getdatalist() {
//     // console.log(this.sourcelimit.page_count);
//     this.sourcelimit.skip = (this.sourcelimit.page_count - 1) * this.sourcelimit.limit;
//     let data = { "source": "contract_manager_list", "condition": {}, "sourcelimit": this.sourcelimit }
//     const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
//     this._http.post(link, data).subscribe((res: any) => {
//       console.log(res.res, 'sourcelimit')
//       let dataall: any = [];
//       for (let item in res.res) {
//         if (res.res[item].status == 'asDraft' && res.res[item].rep_id != this.cookeiservice.get('userid')) {
//           res.res.splice(item,1)
//           // console.log('asDraft', item)
//         } else{
//           dataall.push(res.res[item])
//         }
        
//       }
//       this.datalist = dataall;
//     })
//   }

//   getDataListCount(){
//     // console.log(this.sourceconditionval,"this.sourceconditionval")
//     const link = this._commonservice.nodesslurl + 'datalistcount?token=' + this.cookeiservice.get('jwttoken');
//     this._http.post(link, { source: this.sourceDetails.source, condition: this.sourceDetails.sourcecondition})
//         .subscribe((res:any) => {
//             this.dataListCount = res.resc;
//             this.dataListPageCount = Math.ceil(this.dataListCount / this.sourcelimit.limit)
//             // console.log(this.dataListPageCount);
//         });

// }
// nextPage(flag: string = null) {
//   console.log('ffdffd')
//     if(flag == 'prev' && this.sourcelimit.page_count > 1) {
//         this.sourcelimit.page_count--;
//         console.log(this.sourcelimit.page_count);
//     }
//     if(flag == null && this.sourcelimit.page_count < (this.dataListCount / this.sourcelimit.page_count )) {
//         this.sourcelimit.page_count++;
//         console.log(this.sourcelimit.page_count)
//     }
//     this.getdatalist();
//   }
//   getPageData(){
//       console.log(this.sourcelimit.limit, this.sourcelimit.page_count)
//       if (this.sourcelimit.limit != 0 && this.sourcelimit.limit != null && this.sourcelimit.page_count != 0 && this.sourcelimit.page_count != null) {
//         this.getdatalist();
//         this.getDataListCount();
//       }
//   }






//   statusSearchbyval(val: any){
    
//     console.log(val);
//     if (val != undefined && val != null && val != '' && val != 0) {
//       this.loader = 1;
//       let data: any = {
//         "source":"contract_manager_list",
//         "condition":val
//       }

//       console.log(data);
//       const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
//           this._http.post(link,data).subscribe((res:any) => {
//               this.loader =0;
//               // this.datalist = res.res;
//               let dataall: any = [];
//               for (let item in res.res) {
//                 if (res.res[item].status == 'asDraft' && res.res[item].rep_id != this.cookeiservice.get('userid')) {
//                   res.res.splice(item,1)
//                   // console.log('asDraft', item)
//                 } else{
//                   dataall.push(res.res[item])
//                 }
//               }
//               this.datalist = dataall;
//           });
//     }
//   }
//   productSearchbyval(val: any){
//     console.log(val);
//     if (val != undefined && val != null && val.length > 0) {
//       this.loader = 1;
//       let data: any = {
//         "source":"contract_manager_list",
//         "condition":{
//           "product":val
//         }
//       }

//       const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
//           this._http.post(link,data).subscribe((res:any) => {
//               this.loader =0;
//               // this.datalist = res.res;
//               let dataall: any = [];
//               for (let item in res.res) {
//                 if (res.res[item].status == 'asDraft' && res.res[item].rep_id != this.cookeiservice.get('userid')) {
//                   res.res.splice(item,1)
//                   // console.log('asDraft', item)
//                 } else{
//                   dataall.push(res.res[item])
//                 }
                
//               }
//               this.datalist = dataall;
//           });
//     }
//   }

//   getdata() {
//     this.loader = 1;
//     const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
//     this._http.post(link,{source:'contract_manager_list'}).subscribe((res:any) => {
//       this.loader =0;
//       this.datalist = res.res;
//       this.route.data.forEach((data:any ) => {
//         // this.datalist = data.results.res;
//         // console.log(this.datalist);
//         let dataall: any = [];
//         for (let item in data.results.res) {
//           if (data.results.res[item].status == 'asDraft' && data.results.res[item].rep_id != this.cookeiservice.get('userid')) {
//             data.results.res.splice(item,1)
//             // console.log('asDraft', item)
//           } else{
//             dataall.push(data.results.res[item])
//           }
          
//         }
//         this.datalist = dataall;
//      });
//     });
//   }

//   searchbyname(val: any) {
//     let datalistVal: any = [];
//     let allData = this.datalist;
//     if (val == null || val == '') {
//       this.datalist = allData;
//     } else {
//       datalistVal = [];
//       for (let i in this.datalist) {

//         if (this.datalist[i].lead_fullName != null && this.datalist[i].lead_fullName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
//           datalistVal.push(this.datalist[i]);
//         }
//       } 
//       this.datalist = datalistVal;
//     }
//   }

//   getproduct() {

//     const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
//     this._http.post(link,{source:'products',"condition": {"status":true}}).subscribe((res:any) => {
//       this.productList = res.res;
//     });
//   }
//   setdatetonull() {
//     this.filterval5 = null;
//     this.geteventarr();
// }

//   geteventarr() {
//     this.loader = 1;
//     let cond: any = '';

//     if (this.filterval5 != null && this.filterval5 != '') {
//         this.start_date = moment(this.filterval5[0]).format('YYYY/MM/DD');
//         this.end_date = moment(this.filterval5[1]).format('YYYY/MM/DD');
//         cond = {
//             date: {
//                 $lte: this.end_date,
//                 $gte: this.start_date
//             }
//         };
//         const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
//         this._http.post(link, { source: 'contract_manager_list', condition: cond }).subscribe((res:any) => {
//           this.loader = 0;
//           this.datalist = res.res;
//           this.route.data.forEach((data:any ) => {
//             // this.datalist = data.results.res;
//             let dataall: any = [];
//             for (let item in data.results.res) {
//               if (data.results.res[item].status == 'asDraft' && data.results.res[item].rep_id != this.cookeiservice.get('userid')) {
//                 data.results.res.splice(item,1)
//                 // console.log('asDraft', item)
//               } else{
//                 dataall.push(data.results.res[item])
//               }
              
//             }
//             this.datalist = dataall;
//             // console.log('asDraft1', this.datalist)
//          });
//         });
//     } else {

//         const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
//         this._http.post(link, { source: 'contract_manager_list', condition: cond }).subscribe((res:any) => {
//           this.loader = 0;
//           this.datalist = res.res;
//           this.route.data.forEach((data:any ) => {
//             // this.datalist = data.results.res;
//             let dataall: any = [];
//             for (let item in data.results.res) {
//               if (data.results.res[item].status == 'asDraft' && data.results.res[item].rep_id != this.cookeiservice.get('userid')) {
//                 data.results.res.splice(item,1)
//                 // console.log('asDraft', item)
//               } else{
//                 dataall.push(data.results.res[item])
//               }
              
//             }
//             this.datalist = dataall;
//             // console.log('asDraft1', this.datalist)
//          });
//         });
//     }

// }
// sendToLead(val:any){
// console.log(val)
//   const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
//   this._http.post(link,  { source: 'contract_repote', data: {
//    id: val._id,
//    notes: val.notes,
//    notesByCM:val.notesByCM,
//    status:'send_to_lead',
//    product: val.product,
//    product_id: val.product_id,
//    lead_id:val.lead_id,
//    contract_manager_id: val.contract_manager_id,
//    rep_id:val.rep_id,
//    updated_by: this.cookeiservice.get('userid')
//     }})
//       .subscribe((res: any) => { 
//           if (res.status == 'success') {
//           // this.router.navigateByUrl('/contract-manager-list');
//       }
//       });
// }
// shownotes(val: any, template: TemplateRef<any>){
//   console.log(val);
//   this.modalRef1 = this.modal.show(template);
//   this.notes_list = val;
// }

//   editRow(val: any) {
//     console.log(val);
//     // this.modalRef1.hide();
//     this.router.navigateByUrl('/edit-contract-manager/'+val._id);
//   }
//   downloadpdf(val: any){
//     window.open('https://api.influxhostserver.com/download?file='+val.pdf_url);
//   }
//   modification(val: any){
//     console.log(val);
//     // this.modalRef1.hide();
//     this.router.navigateByUrl('/make-contract-edit/'+val._id)
//   }
  
// openModalData(val: any, template: TemplateRef<any>) {
//   this.modalRef1 = this.modal.show(template);
//     this.selecteditem = val;
// }


// safeHtml(html) {
//   return this._sanitizer.bypassSecurityTrustHtml(html);
// }


// makeContract(item: any, val:string) {
//   console.log(item);
//   if (val == 'edit') {
//     this.router.navigateByUrl('/make-contract-edit/'+item._id);
//   }else{
//     this.router.navigateByUrl('/make-contract/'+item._id);
//   }
// }
// deletdata(val: any, x, template: TemplateRef<any>) {
//   this.modalRef1 = this.modal.show(template);
//   this.selecteditem = val;
//   this.indexCount = x;
//   // console.log(x)
// }

// confirmdelete(template: TemplateRef<any>) {
//     this.modalRef1.hide();
//     this.message = "Record deleted successfully!!";
//     const link = this._commonservice.nodesslurl + 'deletesingledata?token=' + this.cookeiservice.get('jwttoken');
//       this._http.post(link, { source:'contract_repote', id: this.selecteditem._id})
//           .subscribe((res:any) => {
//             // console.log(res);
//             if (res.status == "success") {
//               // this.getdata();
//               this.datalist.splice(this.indexCount, this.indexCount + 1);
//               this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
//             setTimeout(() => {
//                 this.modalRef1.hide();
//             }, 4000);
//             }
            
//         }, error => {
//             console.log('Oooops!');
//         });
//   }
//   nodelete() {
//     this.modalRef1.hide();
//   }


//   showdetails(val: any, value: string) {
// console.log(val, value);
// let source1: string;
//     if (value == 'lead') {
//       source1= 'leads'
//     } else{
//       source1= 'users'
//     }
//     const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
//     if (source1 != null) {
//       this._http.post(link,{source:source1, condition: {"_id":val}}).subscribe(res => {
//           let result: any = res;
//           console.log(result.res);
//       });  
//     }
  }

}
