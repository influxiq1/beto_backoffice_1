import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usermanagement-add-edit',
  templateUrl: './usermanagement-add-edit.component.html',
  styleUrls: ['./usermanagement-add-edit.component.css']
})
export class UsermanagementAddEditComponent implements OnInit {

  formfieldrefresh: boolean = true;
  updatetable: boolean = true;
  formfieldrefreshdata: any = null;
  //public formdata:any;
  formdata:any = {
    successmessage: "Added Successfully !!",
    redirectpath: "/usermanagement",
    submitactive: true, //optional, default true
    submittext: "Add",
    canceltext: "Cancel",
    cancelroute: '/usermanagement',
    resettext:"Reset",
    apiUrl: this._apiService.nodesslurl,
    endpoint: '',  
    jwttoken: this._apiService.jwttoken,
    fields: [
      {
        label: "First Name",
        name: "firstname",
        value: '',
        type: "text",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },
      {
        label: "Last Name",
        name: "lastname",
        value: '',
        type: "text",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },
      {
        label: "Username",
        name: "username",
        value: '',
        type: "text",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },
      {
        label: "Email",
        name: "email",
        value: '',
        type: "text",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },
      {
        label: "Phone no",
        name: "telephone",
        value: '',
        type: "text",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },
      {
        label: "Company Name",
        name: "companyname",
        value: '',
        type: "text",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },
      {
        label: "Address",
        name: "address",
        value: '',
        type: "text",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },
      {
        label: "City",
        name: "city",
        value: '',
        type: "text",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },
      {
        label: "Zip",
        name: "zip",
        value: '',
        type: "number",
        validations: [
          //{ rule: 'required', message: "Enter Title" },
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
        ]
      },


    //   {
    //     label:"id",
    //     name:"id",
    //     type:'hidden',
    //     value:response.res[0]._id
    // }
    ]

  }

  

  constructor(public _apiService: ApiService, public ActivatedRoute: ActivatedRoute) { 
    // if(this.ActivatedRoute.snapshot.params._id !=null && this.ActivatedRoute.snapshot.params._id !=undefined)
    // {
    //   this.update(this.ActivatedRoute.snapshot.params._id);
    // }
  }

  ngOnInit() {
    if (this.ActivatedRoute.snapshot.params._id != null) {

      this.addidfield();
      setTimeout(()=>{
        this.getDataForCategory();
      },50)
      
    }
   
  }
  addidfield(){
    //setTimeout(() => {
      this.formfieldrefreshdata = {
        field: 'addfromcontrol', 
            value: {
            label: "id",
            name: "id",
            type: 'hidden',
            after: 'zip'
        }
    };
    // },100)
  }

  getDataForCategory() {
    if (this.ActivatedRoute.snapshot.params._id != null) {
      this.formdata.successmessage ='Updated Successfully !';
      this.formdata.submittext = "Update";
      this.formdata.endpoint = 'editsingledata'
      this.ActivatedRoute.data.subscribe((response: any) => {
        console.log("Result",response.usereditdata.res[0]._id);
        //this.formfieldrefreshdata = { field: 'id', value: response.usereditdata.res[0]._id };
        let formdata: any = {
          firstname: response.usereditdata.res[0].firstname, 
          lastname: response.usereditdata.res[0].lastname, 
          username: response.usereditdata.res[0].username, 
          email: response.usereditdata.res[0].email, 
          telephone: response.usereditdata.res[0].telephone, 
          companyname: response.usereditdata.res[0].companyname, 
          address: response.usereditdata.res[0].address, 
          city: response.usereditdata.res[0].city, 
          zip: response.usereditdata.res[0].zip, 
          id: response.usereditdata.res[0]._id,
      
      }
    
      this.formfieldrefreshdata = { 
        // field: 'addfromcontrol', 
        // value: {
        // label: "id",
        // name: "id",
        // type: 'text',
        // after: 'zip',
        // value:response.usereditdata.res[0]._id
        // },
        formvaldata: formdata };
      }); 
      
    }
  }
}