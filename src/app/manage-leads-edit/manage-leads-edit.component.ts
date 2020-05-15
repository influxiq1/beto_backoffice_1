import { ApiService } from './../api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-leads-edit',
  templateUrl: './manage-leads-edit.component.html',
  styleUrls: ['./manage-leads-edit.component.css']
})
export class ManageLeadsEditComponent implements OnInit {

 // public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public formdata:any;
  formfieldrefresh:boolean=true;
  updatetable:boolean=true;
  formfieldrefreshdata:any=null;

  constructor(public _apiService: ApiService,public ActivatedRoute:ActivatedRoute) {

    //console.log(this.ActivatedRoute.snapshot.params._id)
    if(this.ActivatedRoute.snapshot.params._id !=null && this.ActivatedRoute.snapshot.params._id !=undefined)
    {
      this.update(this.ActivatedRoute.snapshot.params._id);
    }

   }

  ngOnInit() {
  }
  //update function
  update(id:any){
    let endpoint = 'datalist';                         
    let data: any = {
     "source":'leads',
     "condition":{
      "_id_object":id
     }
    }
    this._apiService.getDataforAdminList(endpoint, data)
    .subscribe((response: any) => {
      console.log(response.res[0]);
      let stat:any;
      if(response.status==1){
        response.status=true;
      }else{
        response.status=false;
      }
      console.log(response.status);
     this.formdata={
        successmessage:"Updated Successfully !!",
        redirectpath:"/manage-leads",
        submittext:"Update",
        submitactive:true, //optional, default true
       apiUrl:this._apiService.nodesslurl,
        endpoint:'addorupdateleads',
       jwttoken:this._apiService.jwttoken,
      
      fields:[
        {
            label:"First Name",
            name:"firstname",
            value:response.res[0].firstname,
            type:"text",
            validations:[
                {rule:'required', message: "First Name Needs to be required"}
                ]
        },
        {
        
          label:"Last Name",
          name:"lastname",
          value:response.res[0].lastname,
          type:"text",
          validations:[
              {rule:'required',message: "Last Name Needs to be required"}
              ]
      },
      {
       
        label:"Email",
        name:"email",
        value:response.res[0].email,
        type:"text",
        validations:[
            {rule:'required', message: "Email field Needs to be required"},
            {rule:'pattern',value: this.emailregex,message: "Must be a valid Email"}
            ]
    },
    {
      
      label:"Address",
      name:"address",
      value:response.res[0].address,
      type:"textarea",
      validations:[
          {rule:'required',message: "Address Needs to be required"},
           {rule:'minLength',value: 5}
          ]
  },
  {
  
    label:"Phone No.",
    name:"phoneno",
    value:response.res[0].phoneno,
    type:"number",
    validations:[
        {rule:'required',message: "Phone Number Needs to be required"},
         {rule:'maxLength',value:10,message: "Enter Valid Number"},
         {rule:'minLength',value: 10,message: "Enter Valid Number"}
        ]
},
{

  label:"Website Url.",
  name:"website",
  value:response.res[0].website,
  type:"text",
  validations:[
      {rule:'required',message: "Website Url Needs to be required"}
      ]
},
{

  label:"Mobile No.",
  name:"mobile",
  value:response.res[0].mobile,
  type:"number",
  validations:[
      {rule:'required',message: "Mobile Number Needs to be required"},
       {rule:'maxLength',value:10,message: "Enter Valid Number"},
       {rule:'minLength',value: 10,message: "Enter Valid Number"}
      ]
},
{

  label:"Products",
  name:"only_productname",
  value:response.res[0].only_productname,
  type:"text",
  validations:[
      {rule:'required',message: "Products Needs to be required"}
      ]
},

        {
            label:"id",
            name:"id",
            type:'hidden',
            value:response.res[0]._id
        }
    ]
}
    });
}

}
