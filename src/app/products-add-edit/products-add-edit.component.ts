import { HttpClient } from '@angular/common/http';
import { ApiService } from './../api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Commonservices } from '../app.commonservices';

@Component({
  selector: 'app-products-add-edit',
  templateUrl: './products-add-edit.component.html',
  styleUrls: ['./products-add-edit.component.css'],
  providers: [Commonservices]
})
export class ProductsAddEditComponent implements OnInit {
  public status: any = [{ val: 1, 'name': 'Active' }, { val: 0, 'name': 'Inactive' }];
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  product_name: any = '';
  temtdata: any = '';
  // formdata
  formfieldrefresh = true;
  updatetable = true;
  formfieldrefreshdata: any = null;
 public formdata: any;

  constructor(public ActivatedRoute: ActivatedRoute, public _apiService: ApiService, public http: HttpClient, public commonservices: Commonservices) {
    console.log(this.ActivatedRoute.snapshot.params._id);
if (this.ActivatedRoute.snapshot.params._id != null && this.ActivatedRoute.snapshot.params._id != undefined) {
  // console.log(this.ActivatedRoute.snapshot.params.id)o
  this.update(this.ActivatedRoute.snapshot.params._id);
 // console.log("ggggggggggg",this.ActivatedRoute.snapshot.params.id);
} else {
  // console.log("hhhhhbjhyv");
  this.formdata = {
    successmessage:"Added Successfully !!", 
    redirectpath:"/products",
    submittext:"Add",
    canceltext: "Cancel",
    cancelroute: '/products',
    resettext:"Reset",
    submitactive:true, //optional, default true
    apiUrl:this._apiService.nodesslurl,
    endpoint:'addorupdateproduct',
   jwttoken:this._apiService.jwttoken,
    fields:[
      {
        //heading:"This is Name Header",
        label:"Products Name",
        name:"productname",
        value:'',
        type:"text",
        validations:[
            {rule:'required', message: "Products Name is required"},
            // {rule:'maxLength',value:10},
            // {rule:'minLength',value: 2}
            ]
    },
    {
      //heading:"This is Name Header",
      label:"Description",
      name:"description",
      value:'',
      type:"textarea",
      validations:[
          {rule:'required' , message: "Description is required"},
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
          ]
  },
  {
    label: 'Status',
    name: 'status',
    hint: '',
    type: 'checkbox',
    // val:this.status,
    value: false,
    validations: [
        // {rule:'required'}
        ]
  },
  {
    label: 'Not Launched',
    name: 'not_launch',
    // hint:'has child ???',
    type: 'checkbox',
    labelPosition: 'after',
    value: false,
    dependent: [{

        condval: true,
        field: {
            label: 'Launch Date',
            name: 'launch_date',
            type: 'date',
            value: new Date().toISOString(),
            hint: '05/05/2020',
            validations: [
               // {rule:'required'}
                ]
        }
    }],
    validations: [
       // {rule:'required'}
        ],

} ,

{
  label: 'Verification Needed',
  name: 'verification_need',
  // hint:'has child ???',
  type: 'checkbox',
  labelPosition: 'after',
  value: false,
  dependent: [{

      condval:true,
      field:{
          label:"Email",
          name:"multiple_emails",
          type:"text",
          validations:[
              //{rule:'required'},
              {rule:'pattern',value: this.emailregex,message: "Enter a valid Email"}
              // {rule:'maxLength',value:10},
              // {rule:'minLength',value: 2}
              ]
      }
  }],
  validations: [
      // {rule:'required'}
      ],

} ,



        // {
        //     label:"id",
        //     name:"id",
        //     type:'hidden',
        //     value:""
        // }
    ]
};
  }
  }

  ngOnInit() {
  }

   // update function
   update(id: any) {
    const endpoint = 'datalist';
    const data: any = {
      'source': 'products',
     'condition': {
      '_id_object': id
     }
    };


    this._apiService.getDataforAdminList(endpoint, data)
      .subscribe((response: any) => {
        this.product_name = response.res[0].productname;
        console.log(response.res[0]);
        let stat: any;
        if (response.status == 1) {
          response.status = true;
        } else {
          response.status = false;
        }
        console.log(response.status);
       this.formdata={
          successmessage:"Updated Successfully !!",
          redirectpath:"/products",
          submittext:"Update",
          canceltext: "Cancel",
          cancelroute: '/products',
          resettext:"Reset",
          submitactive:true, //optional, default true
         apiUrl:this._apiService.nodesslurl,
          endpoint:'addorupdateproduct',
         jwttoken:this._apiService.jwttoken,
        
         fields:[
          {
            //heading:"This is Name Header",
            label:"Products Name",
            name:"productname",
            value:response.res[0].productname,
            type:"text",
            validations:[
                {rule:'required' , message: "Products Name is required"},
                // {rule:'maxLength',value:10},
                // {rule:'minLength',value: 2}
                ]
        },
        {
          //heading:"This is Name Header",
          label:"Description",
          name:"description",
          value:response.res[0].description,
          type:"textarea",
          validations:[
              {rule:'required' , message: "Description is required"},
              // {rule:'maxLength',value:10},
              // {rule:'minLength',value: 2}
              ]
      },
      {
        label: 'Status',
        name: 'status',
        hint: '',
        type: 'checkbox',
        value: response.res[0].status,
        validations: [
          //  {rule:'required'}
            ]
      },
      {
        label: 'Not Launched',
        name: 'not_launch',
        // hint:'has child ???',
        type: 'checkbox',
        labelPosition: 'after',
        value: response.res[0].not_launch,
        dependent: [{

            condval: true,
            field: {
                label: 'Launch Date',
                name: 'launch_date',
                type: 'date',
                value: response.res[0].launch_date,
                hint: '05/05/2020',
                validations: [
                   // {rule:'required'}
                    ]
            }
        }],
        validations: [
          //  {rule:'required'}
            ],

    } ,
    {
      label: 'Verification Needed',
      name: 'verification_need',
      // hint:'has child ???',
      type: 'checkbox',
      labelPosition: 'after',
      value: response.res[0].verification_need,
      dependent: [{

          condval: true,
          field: {
              label: 'Email',
              name: 'multiple_emails',
              type: 'text',
              value: response.res[0].multiple_emails,
              validations: [
                 // {rule:'required'},
                  {rule:'pattern',value: this.emailregex,message: "Entre a valid Email"}
                  // {rule:'maxLength',value:10},
                  // {rule:'minLength',value: 2}
                  ]
          }
      }],
      validations: [
          // {rule:'required'}
          ],

    } ,

            {
                label: 'id',
                name: 'id',
                type: 'hidden',
                value: response.res[0]._id
            }
        ]
  };
      });
  }

}

