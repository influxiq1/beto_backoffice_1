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
  public status: any = [{ val: 'true', 'name': 'Active' }, { val: 'false', 'name': 'Inactive' }];
  emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordregex: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

  temtdata:any='';
  // formdata
  formfieldrefresh:boolean=true;
  updatetable:boolean=true;
  formfieldrefreshdata:any=null;
 public formdata:any;

  constructor(public ActivatedRoute:ActivatedRoute,public _apiService: ApiService, public http: HttpClient, public commonservices: Commonservices) { 
    console.log(this.ActivatedRoute.snapshot.params._id)
if(this.ActivatedRoute.snapshot.params._id !=null && this.ActivatedRoute.snapshot.params._id !=undefined){
  //console.log(this.ActivatedRoute.snapshot.params.id)o
  this.update(this.ActivatedRoute.snapshot.params._id);
 // console.log("ggggggggggg",this.ActivatedRoute.snapshot.params.id);
} else {
  console.log("hhhhhbjhyv");
  this.formdata = {
    successmessage:"Added Successfully !!", 
    redirectpath:"/products",
    submittext:"Add",
    submitactive:true, //optional, default true
    apiUrl:this._apiService.nodesslurl,
    endpoint:'addorupdatedata',
   jwttoken:this._apiService.jwttoken,
    fields:[
      {
        //heading:"This is Name Header",
        label:"Products Name",
        name:"productname",
        value:'',
        type:"text",
        validations:[
            {rule:'required'},
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
          {rule:'required'},
          // {rule:'maxLength',value:10},
          // {rule:'minLength',value: 2}
          ]
  },
  {
    label:"Status",
    name:"status",
    hint:'',
    type:'checkbox',
    value:this.status,
    validations:[
        {rule:'required'}
        ]
  },
  {
    label:"Not Launched",
   // name:"launch_date",
    //hint:'has child ???',
    type:'checkbox',
    labelPosition:'after',
    value: null,
    dependent:{

        condval:true,
        field:{
            label:"Launch Date",
            name:"launch_date",
            type:'date',
            value:new Date().toISOString(),
            hint:"05/05/2020",
            validations:[
                {rule:'required'}
                ]
        }
    },
    validations:[
        {rule:'required'}
        ],

} ,
{
  label:"Verification Needed",
 // name:"launch_date",
  //hint:'has child ???',
  type:'checkbox',
  labelPosition:'after',
  value: null,
  dependent:{

      condval:true,
      field:{
          label:"Email",
          name:"email",
          type:"text",
          validations:[
              {rule:'required'},
              {rule:'pattern',value: this.emailregex,message: "Must be a valid Email"}
              // {rule:'maxLength',value:10},
              // {rule:'minLength',value: 2}
              ]
      }
  },
  validations:[
      {rule:'required'}
      ],

} ,

        {
            label:"id",
            name:"_id",
            type:'hidden',
            value:""
        }
    ]
};
  }
  }

  ngOnInit() {
  }

   //update function
   update(id:any){
    let endpoint = 'datalist';                         
    let data: any = {
     "id":id
    }
    

    this._apiService.getDataforAdminList(endpoint, data)
      .subscribe((response: any) => {
        console.log(response.result[0].firstname);
        let stat:any;
        if(response.status==1){
          response.status=true;
        }else{
          response.status=false;
        }
        console.log(response.status);
       this.formdata={
          successmessage:"Updated Successfully !!",
          redirectpath:"/products",
          submittext:"Edit",
          submitactive:true, //optional, default true
         apiUrl:this._apiService.nodesslurl,
          endpoint:'addorupdatedata',
         jwttoken:this._apiService.jwttoken,
        
         fields:[
          {
            //heading:"This is Name Header",
            label:"Products Name",
            name:"productname",
            value:'',
            type:"text",
            validations:[
                {rule:'required'},
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
              {rule:'required'},
              // {rule:'maxLength',value:10},
              // {rule:'minLength',value: 2}
              ]
      },
      {
        label:"Status",
        name:"status",
        hint:'',
        type:'checkbox',
        value:this.status,
        validations:[
            {rule:'required'}
            ]
      },
      {
        label:"Not Launched",
       // name:"launch_date",
        //hint:'has child ???',
        type:'checkbox',
        labelPosition:'after',
        value: null,
        dependent:{
    
            condval:true,
            field:{
                label:"Launch Date",
                name:"launch_date",
                type:'date',
                value:new Date().toISOString(),
                hint:"05/05/2020",
                validations:[
                    {rule:'required'}
                    ]
            }
        },
        validations:[
            {rule:'required'}
            ],
    
    } ,
    {
      label:"Verification Needed",
     // name:"launch_date",
      //hint:'has child ???',
      type:'checkbox',
      labelPosition:'after',
      value: null,
      dependent:{
    
          condval:true,
          field:{
              label:"Email",
              name:"email",
              type:"text",
              validations:[
                  {rule:'required'},
                  {rule:'pattern',value: this.emailregex,message: "Must be a valid Email"}
                  // {rule:'maxLength',value:10},
                  // {rule:'minLength',value: 2}
                  ]
          }
      },
      validations:[
          {rule:'required'}
          ],
    
    } ,
    
            {
                label:"id",
                name:"_id",
                type:'hidden',
                value:""
            }
        ]
  }
      });
  }

}

