import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Commonservices} from '../app.commonservices' ;

@Component({
  selector: 'app-sales-decks',
  templateUrl: './sales-decks.component.html',
  styleUrls: ['./sales-decks.component.css'],
  providers: [Commonservices]
})
export class SalesDecksComponent implements OnInit {

  public tabledatalis: any = [];
  public formdata: any;
  public datasource: any;
  public sourcecondition: any = {};
  public sourcelimit: any = {};

  constructor(public _commonservices: Commonservices, public cookieservice: CookieService) {
    this.tabledatalis = [
      {value: 'id', name: 'ID', role: 0, func: '', class: 'id', type: '#'},
      {value: 'file1', name: 'Sales Decks Power Point File', role: 0, func: '', class: 'recourcefile', type: 'file', filepath: 'file1'},
      {value: 'file2', name: 'Sales Decks Pdf File', role: 0, func: '', class: 'recourcefile', type: 'file', filepath: 'file2'},
      {value: 'file3', name: 'Thumbnail Image', role: 0, func: '', class: 'recourcefile', type: 'file', filepath: 'file3'},
      {value: 'categoryname', name: 'Category Name', role: 0, func: '', class: 'categoryname', type: 'text'},
      {value: 'status', name: 'Status', role: 0, func: '', class: 'status', type: 'checkbox'},
    ];
    this.formdata = [
      {inputtype: 'select', name: 'category', label: 'Category Name', placeholder: 'Select Category', validationrule: {required: true}, validationerrormsg: 'is required', sourceview: {source: 'resourcecategory', 'condition': {'status': true}}, defaultchoice: 'Select a category', selectvalue: 'categoryname', multiple: null, selectid: '_id'},


      {inputtype: 'file', name: 'file1', label: 'File', placeholder: 'Select File', buttonname: 'Upload Sales Decks Power Point File', validationrule: {required: true}, validationerrormsg: 'is required', imagefolder: 'sales-decks', img_record: {path: 'backoffice_bp_sales_decks', prefix: 'sd' , type: '', bucketname: 'crmfiles.influxhostserver'}},
      {inputtype: 'hidden', name: 'filelocalname', label: 'filelocalname', placeholder: 'filelocalname'},

      {inputtype: 'file', name: 'file2', label: 'File', placeholder: 'Select File', buttonname: 'Upload Sales Decks Pdf File', validationrule: {required: true}, validationerrormsg: 'is required', imagefolder: 'sales-decks', img_record: {path: 'backoffice_bp_sales_decks', prefix: 'sd' , type: 'pdf', bucketname: 'crmfiles.influxhostserver'}},
      {inputtype: 'hidden', name: 'filelocalname2', label: 'filelocalname2', placeholder: 'filelocalname2'},

      {inputtype: 'file', name: 'file3', label: 'File', placeholder: 'Select File', buttonname: 'Upload Thumbnail Image', validationrule: {required: true}, validationerrormsg: 'is required', imagefolder: 'sales-decks', img_record: {path: 'backoffice_bp_sales_decks', prefix: 'sd' , type: '', bucketname: 'crmfiles.influxhostserver'}},
      {inputtype: 'hidden', name: 'filelocalname3', label: 'filelocalname3', placeholder: 'filelocalname3'},

      {inputtype: 'checkbox', name: 'status', label: 'Status', value: false}
    ];
    this.datasource = {table: 'sales-decks', objarr: ['category']};
    this.sourcelimit = { 'skip': 0, 'limit': 10, 'page_count': 1};
  }
  ngOnInit() {
  }

}
