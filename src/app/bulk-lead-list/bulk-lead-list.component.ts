import { ApiService } from './../api.service';
import { Component, OnInit, TemplateRef, AfterViewInit, ViewChild } from '@angular/core';
import {Commonservices} from '../app.commonservices' ;
import { CookieService } from 'ngx-cookie-service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
declare var moment: any;
declare var $: any;

@Component({
  selector: 'app-bulk-lead-list',
  templateUrl: './bulk-lead-list.component.html',
  styleUrls: ['./bulk-lead-list.component.css'],
  providers : [Commonservices]
})
export class BulkLeadListComponent implements OnInit, AfterViewInit {
  public loader: any;
  public formdata: any;
  public datasource: any;
  public tabledatalist: any[];
  public sourcecondition: any = {};
  public product_list: any = {};
  bulk_lead_list: any = [];
  modify_header_array: any = {
    'date_added': 'Date',
    'fullName': 'Full Name',
    'Phone': 'Pnone Number',
    'CompanyName': 'Company Name',
    'Address': 'Address',
    'Web': 'Web',
    'Email': 'Email',
    'batch_name': 'Batch Name',
    'created_by': 'Created By',
    'productName': 'Product Name',


  };

  tabledata_header_skip: any = ['_id','City','County','State','Zip','added_by','created_at','id','product','rep_name','u_id','unique_id','productNamesearch']; // use for Table Header Skip 

  tabledata_detail_skip: any = [];   // use for Table Detail Field Skip
  tablename = 'csv_upload_view';
  searchendpoint = 'datalist';                    // searchendpoint is use for data search endpoint

  // click_to_add_ananother_page = '/adminlist';      // use for click to another page routing path

  date_search_endpoint: any = 'datalist';           // date_search_endpoint is use for date search endpoint

  limitcond: any = {                                 // send basic limit data
    'limit': 10,
    'skip': 0,
    'pagecount': 1
  };

  libdata: any = {
    updateendpoint: 'statusupdate',                  // update endpoint set
    // hideeditbutton: true,                           // (hide edit button)
    hidedeletebutton: false,                         // (hide delete button)
    hideviewbutton: true,                          // (hide view button)
    hidestatustogglebutton: true,                  // (hide status toggle button)
    hideaction: true,                              // (hide action column)
    deleteendpointmany: 'delete',
    tableheaders: ['fullName','Phone','Address','Email','productName','CompanyName','batch_name','Web','created_by','date_added'], //not required (table header name)
    custombuttons: []
  };

  sortdata: any = {
    "type": 'asc',                                              //  default sort data ascend and descend (desc)
    "field": 'fullName',                                         // default field for sorting
    "options": ['fullName','Email','date_added','CompanyName']     //  sorting fields options for this table
  };

  date_search_source: any = 'csv_upload_view';                     // this is a database collection or view name

  datacollection: any = 'getbulkleadsmanagelistdata';                    // data collection end point

  date_search_source_count: any = 0;                               // variable declare and initialize for default counting data for source count

  authval: any = [
  ];

  // this is search block
  search_settings: any = {

    datesearch: [{startdatelabel: 'Start Date', enddatelabel: 'End Date', submit: 'Search1',  field: 'date_added'}],

    // selectsearch:[{ label: 'Search By Product', field: 'prodct_id', values: this.product_list }], // this is use for  select search

   textsearch:[{label:"Search By Name",field:'fullName_s'},{label:"Search By Email",field:'Email'},{label:"Search By Product Name",field:'productNamesearch'}]     // this is use for  Autocomplete search
  };

//   elements: any = [];
//   previous: any = [];

//   public loader = 0;
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
// public message;
//  headElements = ['ID', 'Date', 'Full Name', 'Phone', 'Company Name', 'Address', 'Web', 'Email', 'Batch Name', 'Created By', 'Product Name'];
// public productList: any = [];
// public prodSelect: any = 0;
// public filterValForName: any;
// public filterval5: any = '';
// public start_date: any = '';
// public end_date: any = '';
// public notes_list: any = '';
// public indexCount: number;
// public skipCount: number = 25;
// masterSelected:boolean = false;
// public check_true = false;
// checkedList:any;
// public checked_ids: any = [];
// public allChecked_ids: any = [];
// public rep_list: any = '';

  constructor(public _commonservice: Commonservices,
   public cookeiservice: CookieService,
    public _http: HttpClient,
    public router: Router,
    public route: ActivatedRoute,
    public modal: BsModalService,
    protected _sanitizer: DomSanitizer,
    public _apiService: ApiService) {
    //  console.log(this.route.snapshot.params._id)

    this.datasource = '';
    const endpoint = 'getbulkleadsmanagelistdata';                              // for main data endpoint
    const endpointc = 'getbulkleadsmanagelistdata-count';                       // for count endpoint
    // data param for conditionlimit and search
    const data: any = {
      'condition': {
        'limit': 10,
        'skip': 0,
        '_id': this.route.snapshot.params._id
      },
      sort: {
        'type': 'desc',                                           // defalut field sort type
        'field': 'fullName'                                         // default sort field
      }

    };

    const link = this._commonservice.nodesslurl + endpoint;
    const link1 = this._commonservice.nodesslurl + endpointc;
    this._http.post(link, data)
      .subscribe((response: any) => {

         this.bulk_lead_list = response.results.res;
        console.warn('blogData', this.bulk_lead_list);
      });

    this._http.post(link1, data)
      .subscribe((res: any) => {
        console.log(res.count, ' for count');
        this.date_search_source_count = res.count;

      });
     }

  ngOnInit() {

  //   this.route.data.forEach((data:any ) => {
  //     this.datalist = data.results.res;
  //     // this.skipCount = data.results.resc;
  //     // this.headElements = Object.keys(data.results.res[0]);
  //  });
  //  console.log((this.datalist[0].contentTop));
   // this.getproduct();
  }


  // for_rep

  // isAllSelected(event: any) {
  //   this.checked_ids = [];
  //   console.log(event.target.name);
  //   console.log(event.target.checked);
  //   console.log(event.target.value);
  //   console.log(event.target.value.length)
  //   if (event.target.checked == true) {
  //     for (var i = 0; i < 24; i++ ) {
  //       console.log(this.datalist[i], i);
  //       this.allChecked_ids.push(this.datalist[i].id);
  //       this.check_true = true;
  //     }
  //   } else {
  //     this.check_true = false;
  //     this.allChecked_ids = [];
  //   }
  //   console.log(this.allChecked_ids)
  // }
  // checkUncheck(event: any) {
  //   this.allChecked_ids = [];
  //   console.log(event.target.name);
  //   console.log(event.target.checked);
  //   if (event.target.checked == true) {
  //     // this.check_true = true;
  //     this.checked_ids.push(event.target.value);
  //   } else {
  //     this.check_true = false;
  //     this.checked_ids.splice(event.target.value, 1);
  //   }
  //   console.log(event.target.value, this.checked_ids);
  // }
  // assen_to_rep(template: TemplateRef<any>){
  //   console.log(this.checked_ids)
  //   this.modalRef1 = this.modal.show(template);
  //   const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
  //       this._http.post(link, { source: 'for_rep'}).subscribe((res:any) => {
  //         // this.datalist = res.res;
  //         console.log(res);
  //         this.rep_list = res.res;
  //       });
  // }
  ngAfterViewInit() {
  }
//   previouspage(){

//     let count = this.skipCount - 25;
//     this.skipCount = count;
//     console.log(count,'-')
//     let cond = {
//       "_id": this.route.snapshot.params._id,
//       "skip":count
//     }
// if (count>=25) {


//     const link = this._commonservice.nodesslurl + 'leadlist?token=' + this.cookeiservice.get('jwttoken');
//         this._http.post(link, { source: 'csv_upload_view', condition: cond }).subscribe((res:any) => {
//           this.loader = 0;
//           this.datalist = res.res;
//         });
//   }
// }

//   nextpage(){
//     let count = this.skipCount + 25;
//     this.skipCount = count;
//     console.log(count,'+');
//     let cond = {
//       "_id": this.route.snapshot.params._id,
//       "skip":count
//     }

//     const link = this._commonservice.nodesslurl + 'leadlist?token=' + this.cookeiservice.get('jwttoken');
//         this._http.post(link, { source: 'csv_upload_view', condition: cond }).subscribe((res:any) => {
//           this.loader = 0;
//           this.datalist = res.res;
//         });
//   }

//   productSearchbyval(val: any){
//     this.loader = 1;
//     console.log(val);
//     if (val != undefined && val != null && val.length > 0) {
//       let data: any = {
//         "source":"csv_upload_view",
//         "condition":{
//           "product":val
//         }
//       }

//       const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
//           this._http.post(link,data).subscribe((res:any) => {
//               this.loader =0;
//               this.datalist = res.res;
//           });
//     }
//   }

 // getdata() {
    // this.loader = 1;
    // const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
    // this._http.post(link,{source:'contract_repote_view'}).subscribe((res:any) => {
    //   this.loader =0;
    //   this.datalist = res.res;
    // });
//  }

//   searchbyname(val: any) {

//     console.log(val)
//     let datalistVal: any = [];
//     var allData: any;
//     allData = this.datalist;
//     console.log(allData)
//     if (val == null || val == '') {
//       this.datalist = allData;
//     } else {
//       datalistVal = [];
//       for (let i in this.datalist) {

//         if (this.datalist[i].fullName != null && this.datalist[i].fullName.toLowerCase().indexOf(val.toLowerCase()) > -1) {
//           datalistVal.push(this.datalist[i]);
//         }
//       }
//       this.datalist = datalistVal;
//     }
//   }

//   getproduct() {

//     const link = this._commonservice.nodesslurl+'datalist?token='+this.cookeiservice.get('jwttoken');
//     this._http.post(link,{source:'products'}).subscribe((res:any) => {
//         // let result: any = res;
//         // console.log(result.res);
//         // this.datalist = result.res;
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
//         this._http.post(link, { source: 'csv_upload_view', condition: cond }).subscribe((res:any) => {
//           this.loader = 0;
//           this.datalist = res.res;
//         });
//     } else {

//         const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
//         this._http.post(link, { source: 'csv_upload_view', condition: cond }).subscribe((res:any) => {
//           this.loader = 0;
//           this.datalist = res.res;
//         });
//     }

// }
// // sendToLead(val:any){
// // // console.log(val)
// // //   const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
// // //   this._http.post(link,  { source: 'contract_repote', data: {
// // //    id: val._id,
// // //    notes: val.notes,
// // //    notesByCM:val.notesByCM,
// // //    status:'send_to_lead',
// // //    product: val.product,
// // //    product_id: val.product_id,
// // //    lead_id:val.lead_id,
// // //    contract_manager_id: val.contract_manager_id,
// // //    rep_id:val.rep_id,
// // //    updated_by: this.cookeiservice.get('userid')
// // //     }})
// // //       .subscribe((res: any) => {
// // //           if (res.status == 'success') {
// // //           // this.router.navigateByUrl('/contract-manager-list');
// // //       }
// // //       });
// // }
// shownotes(val: any, template: TemplateRef<any>){
//   // console.log(val);
//   // this.modalRef1 = this.modal.show(template);
//   // this.notes_list = val;
// }

  // editRow(val: any) {
  //   // console.log(val);
  //   // // this.modalRef1.hide();
  //   // this.router.navigateByUrl('/edit-contract-manager/'+val._id);
  // }

// openModalData(val: any, template: TemplateRef<any>) {
//   // this.modalRef1 = this.modal.show(template);
//   //   this.selecteditem = val;
// }


// safeHtml(html) {
//   // return this._sanitizer.bypassSecurityTrustHtml(html);
// }


// makeContract(item: any, val:string) {
//   // console.log(item);
//   // if (val == 'edit') {
//   //   this.router.navigateByUrl('/make-contract-edit/'+item._id);
//   // }else{
//   //   this.router.navigateByUrl('/make-contract/'+item._id);
//   // }
// }
// deletdata(val: any, x, template: TemplateRef<any>) {
  // this.modalRef1 = this.modal.show(template);
  // this.selecteditem = val;
  // this.indexCount = x;
  // console.log(x)
// }

// confirmdelete(template: TemplateRef<any>) {
//     this.modalRef1.hide();
//     this.message = "Record deleted successfully!!";
//     const link = this._commonservice.nodesslurl + 'deletesingledata?token=' + this.cookeiservice.get('jwttoken');
//       this._http.post(link, { source:'csv_upload', id: this.selecteditem._id})
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


 // showdetails(val: any, value: string) {
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
 // }

}
