import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usermanagement-add-edit',
  templateUrl: './usermanagement-add-edit.component.html',
  styleUrls: ['./usermanagement-add-edit.component.css']
})
export class UsermanagementAddEditComponent implements OnInit {

  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  formfieldrefresh: boolean = true;
  updatetable: boolean = true;
  formfieldrefreshdata: any = null;
  public statesjson: any = [];
  // public formdata:any;
  formdata: any = {
    successmessage: 'Added Successfully !!',
    redirectpath: '/usermanagement',
    submitactive: true, // optional, default true
    submittext: 'Add',
    canceltext: 'Cancel',
    cancelroute: '/usermanagement',
    resettext: 'Reset',
    apiUrl: this._apiService.nodesslurl,
    endpoint: '',
    jwttoken: this._apiService.jwttoken,
    fields: [
      {
        label: 'First Name',
        name: 'firstname',
        value: '',
        type: 'text',
        validations: [
          { rule: 'required', message: 'Required First Name' },
        ]
      },
      {
        label: 'Last Name',
        name: 'lastname',
        value: '',
        type: 'text',
        validations: [
          { rule: 'required', message: 'Required Last Name' },
        ]
      },
      {
        label: 'Email',
        name: 'email',
        value: '',
        type: 'text',
        validations: [
          { rule: 'required', message: "Required Email" },
          {rule:'pattern',value: this.emailregex,message: "Entre a valid Email"}
        ]
      },
      {
        label: 'Phone no',
        name: 'telephone',
        value: '',
        type: 'text',
        validations: [
          { rule: 'required', message: 'Required Phone Number' },
        ]
      },
      {
        label: 'Company Name',
        name: 'companyname',
        value: '',
        type: 'text',
        validations: [
          { rule: 'required', message: 'Required Company Name' },
        ]
      },
      {
        label: 'Address',
        name: 'address',
        value: '',
        type: 'text',
        validations: [
          { rule: 'required', message: 'Required Address' },
        ]
      },
      {
        label: 'City',
        name: 'city',
        value: '',
        type: 'text',
        validations: [
          { rule: 'required', message: 'Required City' },
        ]
      },
      {
        label: 'State',
        name: 'state',
        value: '',
        val: this.statesjson,
        type: 'select',
        validations: [
          { rule: 'required', message: 'Required State' },

        ]
      },
      {
        label: 'Zip',
        name: 'zip',
        value: '',
        type: 'number',
        validations: [
          { rule: 'required', message: 'Required Zip' },
        ]
      },
    ]

  };



  constructor(public _apiService: ApiService, public ActivatedRoute: ActivatedRoute) {
    this._apiService.getState().subscribe((response: any) => {
       for (const i in response) {
         this.statesjson.push(
           { 'val': response[i].abbreviation, 'name': response[i].name },
         );
       }
     });
  }

  ngOnInit() {
    if (this.ActivatedRoute.snapshot.params._id != null) {

      this.addidfield();
      setTimeout(() => {
        this.getDataForCategory();
      }, 500);
    }

  }
  addidfield() {
      this.formfieldrefreshdata = {
        field: 'addfromcontrol',
        value: {
        label: 'id',
        name: 'id',
        type: 'hidden',
        after: 'zip',
        value: this.ActivatedRoute.snapshot.params._id
    }
    };
  }

  getDataForCategory() {
    if (this.ActivatedRoute.snapshot.params._id != null) {
      this.formdata.successmessage = 'Updated Successfully !';
      this.formdata.submittext = 'Update';
      this.formdata.endpoint = 'editsingledata';
      this.ActivatedRoute.data.subscribe((response: any) => {
        console.log('Result', response.usereditdata);
        const formdata: any = {
          firstname: response.usereditdata.res[0].firstname,
          lastname: response.usereditdata.res[0].lastname,
          username: response.usereditdata.res[0].username,
          email: response.usereditdata.res[0].email,
          telephone: response.usereditdata.res[0].telephone,
          companyname: response.usereditdata.res[0].companyname,
          address: response.usereditdata.res[0].address,
          city: response.usereditdata.res[0].city,
          state: response.usereditdata.res[0].state,
          zip: response.usereditdata.res[0].zip,

      };

      this.formfieldrefreshdata = {
        formvaldata: formdata };
      });

    }


    console.log('this.formfieldrefreshdata', this.formfieldrefreshdata);
  }
}
