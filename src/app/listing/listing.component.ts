import { Component, OnInit, TemplateRef, ViewChild, EventEmitter, ElementRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Commonservices } from '../app.commonservices';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { CookieService } from 'ngx-cookie-service';
import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions } from 'ngx-uploader';
import {ModalOptions} from 'ngx-bootstrap';
import { DomSanitizer} from '@angular/platform-browser';

declare var moment: any;
declare var $: any;
@Component({
    selector: 'app-listing',
    templateUrl: './listing.component.html',
    styleUrls: ['./listing.component.css'],
    providers: [Commonservices],
})
export class ListingComponent implements OnInit {
    public share_link: any = [];
    public csvHeader: any;
    sendLeadEmailForm: FormGroup;
    public csvHeaderAllData: any = '';
    public staticHeader = ['FirstName', 'LastName', 'CompanyName', 'Address', 'City', 'County', 'State', 'Zip', 'Phone', 'Email', 'Web'];
    public start_time: any;
    public end_time: any;
    public submitval: any = 1;
    public message: any = '';
    public datalist: any = [];
    public formdataval: any = [];
    modalRef: BsModalRef;
    modalRef1: BsModalRef;
    modalRef2: BsModalRef;
    modalRef3: BsModalRef;
    private selectedid: any;
    public showLoader: any;
    public sourceval: any;
    @Input() templatetype = '';
    @Input() sourcetitle = 0;
    @Input() menuval = 0;
    @Input() hideaction: any = false;
    @Input() hideadd: any = false;
    @Input() notes: any = true;
    @Input() slotlist: any = false;
    public tabledatalisval: any;
    public formgroup: FormBuilder;
    public dataForm: FormGroup;
    public sourceconditionval: any;
    public sourcelimitval: any;
    public timezone: any = [];
    public leads_list: any = '';
    public tab_header: any = '';
    public emailexist: any = '';
    public sucessmodalflag = false;
    daterangepickerOptions = {
        format: 'MM/DD/YYYY',
        minDate: moment().format('MM/DD/YYYY'),
        noDefaultRangeSelected: true
    };
    bsDatepicker = {
        format: 'MM/DD/YYYY',
        minDate: moment().format('MM/DD/YYYY'),
        noDefaultRangeSelected: true
    };
    public formsourceval: any = [];
    public selecteditem: any;
    public filterval;
    public filterval1;
    public filterval2;
    public interv;
    public filterval3;
    public filterval6: any = {};
    imageChangedEvent: any = [];
    public croppedImage: any = [];
    public base64imgdata: any = '';
    public unsafebase64imgdata: any = [];
    public selectedFile: any;
    public isedit = 0;
    public usertype: any;
    public itemis: any;
    public lockunlock: any;
    public minDate: any = new Date();

    files: UploadFile[];
    uploadInput: EventEmitter<UploadInput>;
    humanizeBytes: Function;
    dragOver: boolean;
    options: UploaderOptions;
    @ViewChild('fileInput1') uploaderInput: ElementRef;
    public percentageis: any = [];
    public lengthis: any = [];
    public flag = 0;
    public nameis: any = [];
    public issubmit = 0;
    public loaderdiv = false;
    public selectedlead: any = {};
    public inputflag: any = 0;
    public inputflag_launch_date: any = 0;
    public productlist: any = [];
    public selectedproductid: any = '';
    public productSubmitFlag: any = 0;
    public productErrorFlag: any = 0;
    public autoplayVideo: any = [];
    public selectedstatus: any;
    public pricepoint: any = '';
    public issubmitprice: any = 0;
    public viewonlyaccess: any = '';
    public prodSelect = 0;
    public repSelect = 0;
    public leadsMarkting = 0;
    public productval: any = '';
    public repnameval: any = '';
    public filterval5: any = '';
    public start_date: any = '';
    public end_date: any = '';
    public youtubeVideoUrl: any = '';
    public editsourceval: any = '';
    public preview: any = false;
    public submit_loaderbar = false;
    public submit_loaderbar1 = false;
    public leadIsSubmit: any = 0;
    public videolink: any = '';
    public openFlag = 0;
    public dataListCount: any = '';
    public dataListPageCount: any = '';
    emailPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    @Input()
    set source(source: string) {
        this.sourceval = (source && source.trim()) || '<no name set>';
    }
    @Input()
    set sourcecondition(sourcecondition: string) {
        this.sourceconditionval = (sourcecondition) || '<no name set>';
    }
    @Input()
    set sourcelimit(sourcelimit: string) {
        this.sourcelimitval = (sourcelimit) || '<no name set>';
        console.log(this.sourcelimitval);
    }
    @Input()
    set formsource(formsource: string) {
        this.formsourceval = (formsource) || '<no name set>';
    }
    @Input()
    set tabledatalis(tabledatalis: string) {
        this.tabledatalisval = (tabledatalis) || '<no name set>';
    }
    @Input()
    set formdata(formdata: string) {
        this.formdataval = (formdata) || '<no name set>';
    }
    @Input()
    set editsource(editsourcev: string) {
        this.editsourceval = editsourcev;
    }

    productForm: FormGroup;
    invalidEmails = [];
    constructor(public _commonservice: Commonservices, public router: Router, public _http: HttpClient, public modal: BsModalService, formgroup: FormBuilder, public cookeiservice: CookieService, public sanitizer: DomSanitizer, public route: ActivatedRoute) {

        this.formgroup = formgroup;
        this._commonservice = _commonservice;
        this.uploadInput = new EventEmitter<UploadInput>();
        this.humanizeBytes = humanizeBytes;
        this.viewonlyaccess = this.cookeiservice.get('viewonlyaccess');

    }

    ngOnInit() {


        const link2 = this._commonservice.nodesslurl + 'complete_traning_catagory_by_user';
        this._http.post(link2, {
          'condition': { 'userid': this.cookeiservice.get('userid') }
        })
          .subscribe((res: any) => {
            // console.log("++")
            const training_lesson_count_val: any = res.data.training_lesson_count;
            const complete_traning_catagory_by_user_val: any = res.data.complete_traning_catagory_by_user;
            for (const item of training_lesson_count_val) {
              // console.log(item);
              for (const complete_traning of complete_traning_catagory_by_user_val) {

                if (item._id == complete_traning.trainingcategory && item.count <= complete_traning.lessondone && complete_traning.trainingcategory != '5e60865df4a08401e0e00e6c') {
                    this.share_link.push({ product_id: item.product[0], product_name: item.product_name});
                  }
              }
            }
          });




        this.sendLeadEmailForm = this.formgroup.group({
            'email': ['', Validators.compose([Validators.required, Validators.pattern(/^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/)])],
            'product_id': ['', Validators.required]
            });

         /* Initiate the form structure */


        // added by Himadri Using Product list search
        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source: 'tranningcategory' , condition: {'status': true}}).subscribe((res: any) => {
            this.productval = res.res;
            // console.log(this.productval)
        });
        if (this.router.url == '/manage-leads' && this.cookeiservice.get('usertype') == 'admin') {
            this._http.post(link, { source: 'for_rep'}).subscribe((res1: any) => {
               this.repnameval = res1.res;
           });
        }


        this.usertype = this.cookeiservice.get('usertype');
        this.getdatalist();

        if (this.sourcelimitval != null && typeof (this.sourcelimitval) != 'undefined' && typeof (this.sourcelimitval.skip) != 'undefined') {
            this.getDataListCount();
        }

        this._http.get('assets/data/timezone.json')
            .subscribe(res => {
                let result;
                this.timezone = result = res;
            }, error => {
                console.log('Oooops!');

            });
    }
    ngOnDestroy() {
        clearInterval(this.interv);
    }

    openModal() {
        this.openFlag = 1 - this.openFlag;
    }


    openCsvMach(template: TemplateRef<any>) {
        const formgrp: any = [];
        for (const c in this.staticHeader) {
            const tempdefault = [];
            formgrp[this.staticHeader[c]] = [tempdefault, Validators.required];
        }
        this.productForm = this.formgroup.group(formgrp);


        if (this.csvHeaderAllData != '') {
            this.csvHeader = this.csvHeaderAllData.data;

            setTimeout(() => {
                this.modalRef2 = this.modal.show(template);
            }, 2000);
        }

    }

    productFormsubmit() {
        this.submit_loaderbar = true;
        console.log(this.productForm.value);
        const link = this._commonservice.nodesslurl + 'write-csv';
        // var data: any = {
        //     data: [this.productForm.value],
        //     "filename":this.csvHeaderAllData.filename
        // }
        this._http.post(link, {data: [this.productForm.value], 'filename': this.csvHeaderAllData.filename
        }).subscribe((res: any) => {
            this.submit_loaderbar = false;
            this.preview = true;
            // this.modalRef2.hide();
            this.leads_list = res.result;
            this.tab_header = Object.keys(this.leads_list[0]);


        });
    }
    preview_button(template: TemplateRef<any>) {

        // setTimeout(()=>{
            this.modalRef3 = this.modal.show(template);
        // },2000);
    }
    submit_leads(template: TemplateRef<any>, val: any) {
        this.submit_loaderbar1 = true;
        this.issubmit = 1;
        let y: any;
        for (y in this.dataForm.controls) {
            this.dataForm.controls[y].markAsTouched();
        }
        if (this.dataForm.valid && this.submitval == 1) {
            this.dataForm.value.file = this.leads_list;
            this.dataForm.value.created_by = this.cookeiservice.get('userid');
            const link = this._commonservice.nodesslurl + 'addorupdatedata';
            this._http.post(link, { source: this.formsourceval.table, data: this.dataForm.value, sourceobj: this.formsourceval.objarr })
                .subscribe(res => {
                    let result: any;
                    result = res;
                    this.issubmit = 0;
                    if (result.status == 'success') {
                        this.submit_loaderbar1 = false;
                        // this.sucessmodalflag = true;
                        this.isedit = 0;
                        this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                        setTimeout(() => {
                            this.modalRef1.hide();
                            this.modalRef2.hide();
                            this.modalRef.hide();
                            if (val == '0') {
                             this.modalRef3.hide();
                            }
                            this.isedit = 0;
                        }, 4000);
                            this.getdatalist();
                            this.dataForm.reset();


                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
        // this.formsubmit();

    }


// added by Himadri Using for Open Youtube Modal
youtubeVideoPlay(val: any, template: TemplateRef<any>) {
    const value: any = val.changingThisBreaksApplicationSecurity;
    const id: any = value.split('be/')[1].substring(0, 11);

    this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + id);
    this.modalRef3 = this.modal.show(template);
}

discoveryYoutubeVideoPlay(val: any, template: TemplateRef<any>) {

    this.youtubeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + val);
    this.modalRef3 = this.modal.show(template);
}
// added by Himadri Using for rep search
    repNameSearchbyval(val) {
        if (val != null && val != '') {
            this.sourceconditionval = {rep_name: val};
            console.log(this.sourceconditionval, '++++++');
            this.getdatalist();
        }
    }
//  added by Himadri Using for product search
    productSearchbyval(filterValue: any) {
        if (filterValue != '' && filterValue != null) {
            // // console.log(filterValue.toLowerCase())
            let linkForproductsearch: any ;
            if (this.router.url == '/contract/management') {
                linkForproductsearch  = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');

                this._http.post(linkForproductsearch, {
                     'source': 'contract_view',
                    'condition': {
                        'productname': filterValue
                    }
                }).subscribe((res: any) => {
                    this.datalist = res.res;
                });
            } else if (this.router.url == '/belk-upload') {
                linkForproductsearch  = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');

                this._http.post(linkForproductsearch, {
                     'source': 'csv_upload_list',
                    'condition': {
                        'productname': filterValue
                    }
                }).subscribe((res: any) => {
                    this.datalist = res.res;
                });
            } else {
                linkForproductsearch = this._commonservice.nodesslurl + 'productsearch';
                this._http.post(linkForproductsearch, { 'product': filterValue }).subscribe((res: any) => {
                    this.datalist = res.data;
                });
            }


        }
    }
    //  added by Himadri Using date search

setdatetonull() {
    this.filterval5 = null;
    this.geteventarr();
}
    geteventarr() {

        let cond: any = '';

        if (this.filterval5 != null && this.filterval5 != '') {

            if (this.router.url == '/delete-event') {
                this.start_date = moment(this.filterval5[0]).format('YYYY-MM-DD');
                this.end_date = moment(this.filterval5[1]).format('YYYY-MM-DD');
                cond = {
                    date: {
                        $lte: this.end_date,
                        $gte: this.start_date
                    }
                };
                // if (this.router.url == '/delete-event') {
                    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
                    this._http.post(link, { source: 'commonevent_view', condition: cond }).subscribe(res => {
                        const result: any = res;
                        this.datalist = result.res;
                    });
                // }
            } else if (this.router.url == '/google-event') {
                console.log('test date');
                this.start_date = moment(this.filterval5[0]).format('YYYY-MM-DD');
                this.end_date = moment(this.filterval5[1]).format('YYYY-MM-DD');
                cond = {
                    date: {
                        $lte: this.end_date,
                        $gte: this.start_date
                    }
                };
                // if (this.router.url == '/delete-event') {
                    const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
                    this._http.post(link, { source: 'usergoogleevent_view', condition: cond }).subscribe(res => {
                        const result: any = res;
                        this.datalist = result.res;
                    });
                // }
            } else {
                this.start_date = moment(this.filterval5[0]).format('YYYY/MM/DD');
                this.end_date = moment(this.filterval5[1]).format('YYYY/MM/DD');
                cond = {
                    date: {
                        $lte: this.end_date,
                        $gte: this.start_date
                    }
                };

            if (this.router.url == '/belk-upload') {
                const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
                this._http.post(link, { source: 'csv_upload_list', condition: cond }).subscribe(res => {
                    const result: any = res;
                    this.datalist = result.res;
                });
            } else {
                console.log('test date leads_view_for_users');
                const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
                this._http.post(link, { source: 'leads_view_for_users', condition: cond }).subscribe(res => {
                    const result: any = res;
                    this.datalist = result.res;
                });
            }
        }

        } else {


            if (this.router.url == '/delete-event') {
                const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
                this._http.post(link, { source: 'commonevent_view', condition: cond }).subscribe(res => {
                    const result: any = res;
                    this.datalist = result.res;
                });
            } else if (this.router.url == '/google-event') {
                const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
                this._http.post(link, { source: 'usergoogleevent_view', condition: cond }).subscribe(res => {
                    const result: any = res;
                    this.datalist = result.res;
                });
            } else if (this.router.url == '/belk-upload') {
                const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
                this._http.post(link, { source: 'csv_upload_list', condition: cond }).subscribe(res => {
                    const result: any = res;
                    this.datalist = result.res;
                });
            } else {
                const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
                this._http.post(link, { source: 'leads_view_for_users', condition: cond }).subscribe(res => {
                    const result: any = res;
                    this.datalist = result.res;
                });
            }
        }

    }

    searchbyvalForType() {
        const searchCondition = this.sourceconditionval;
        if (this.filterval != '' && this.filterval != null) {
            this.sourceconditionval = {type: {$regex: this.filterval}};
            this.getdatalist();
        } else {
            this.sourceconditionval = searchCondition;
            this.getdatalist();
            console.log(this.filterval);
        }
    }
    searchbyval() {
        this.filterval = '';
        const searchCondition = this.sourceconditionval;
        if (this.filterval1 != '' && this.filterval1 != null) {
            this.filterval = this.filterval1 + '|';
        }
        if (this.router.url == '/manage-leads' && this.filterval2 != '' && this.filterval2 != null) {
            this.filterval = this.filterval2 ;
            this.sourceconditionval.email = {$regex: this.filterval};
            console.log(this.sourceconditionval, '++++++');
            this.getdatalist();
        } else if (this.router.url != '/manage-leads' && this.filterval2 != '' && this.filterval2 != null) {
            this.filterval = this.filterval2 ;
            this.filterval = this.filterval2 + '|';
        }
        if (this.router.url == '/manage-leads' && this.filterval3 != '' && this.filterval3 != null) {
            // this.filterval = this.filterval3 + '|';
            this.filterval = this.filterval3;
            this.sourceconditionval.fullname = {$regex: this.filterval};
            console.log(this.sourceconditionval, '++++++');
            this.getdatalist();
        } else if (this.router.url != '/manage-leads' && this.filterval3 != '' && this.filterval3 != null) {
            this.filterval = this.filterval3 ;
            this.filterval = this.filterval3 + '|';
        }
        if (this.filterval1 == '' || this.filterval1 == null) {} else if (this.filterval2 == '' || this.filterval2 == null) {delete this.sourceconditionval.email; this.getdatalist(); } else if (this.filterval3 == '' || this.filterval3 == null) {delete this.sourceconditionval.fullname;
        console.log(this.filterval); this.getdatalist(); }
    }
    gettimezone(val) {
        for (const v in this.timezone) {
            if (this.timezone[v].value == val) {
                return this.timezone[v].timezone_city;
            }
        }
        return 'N/A';
    }

    toggleVOaccess(item: any) {
        let viewonlyaccess: any;
        if (item.viewonlyaccess != null && item.viewonlyaccess == true) {
            viewonlyaccess = false;
        }
        if (item.viewonlyaccess == null || item.viewonlyaccess == false) { viewonlyaccess = true; }
        const link = this._commonservice.nodesslurl + 'addorupdatedata';
        this._http.post(link, {
            source: this.formsourceval.table,
            data: { id: item._id, viewonlyaccess: viewonlyaccess}})
            .subscribe(res => {
                this.getdatalist();
            }, error => {
                this.getdatalist();
            });
    }
    togglestatus(item: any) {
        let status: any;
        if (item.status != null && item.status == true) {
            status = false;
        }
        if (item.status == null || item.status == false) { status = true; }
        const link = this._commonservice.nodesslurl + 'togglestatus?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { id: item._id, source: this.formsourceval.table, status: status })
            .subscribe(res => {
                this.getdatalist();
            }, error => {
                this.getdatalist();
            });
    }
    togglelockedstatusmodal(item: any, lockunlock, template: TemplateRef<any>, event) {
        this.modalRef1 = this.modal.show(template);
        event.stopPropagation();
        this.itemis = item;
        this.lockunlock = lockunlock;

    }
    togglelockedstatus() {
        let status: any;
        status = this.itemis.lock;
        if (this.itemis.lock == null && this.itemis.lock != 1 && this.itemis.lock != 0) {
            status = 1;
        }
        this.modalRef1.hide();
        const link = this._commonservice.nodesslurl + 'togglelockedstatus?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { id: this.itemis._id, source: this.formsourceval.table, status: status })
            .subscribe(res => {
                this.getdatalist();
            }, error => {
                this.getdatalist();
            });
    }

    go_to_lead_list(val: any) {
        console.log(val);
        this.router.navigate(['/lead-list/', val._id]);
    }
    getDataListCount() {
        console.log(this.sourceconditionval, 'this.sourceconditionval');
        const link = this._commonservice.nodesslurl + 'datalistcount?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source: this.sourceval, condition: this.sourceconditionval})
            .subscribe((res: any) => {
                this.dataListCount = res.resc;
                this.dataListPageCount = Math.ceil(this.dataListCount / this.sourcelimitval.limit);
                // console.log(this.dataListPageCount);
            });

    }
    nextPage(flag: string = null) {
        if (flag == 'prev' && this.sourcelimitval.page_count > 1) {
            this.sourcelimitval.page_count--;
            console.log(this.sourcelimitval.page_count);
        }
        if (flag == null && this.sourcelimitval.page_count < (this.dataListCount / this.sourcelimitval.page_count )) {
            this.sourcelimitval.page_count++;
            console.log(this.sourcelimitval.page_count);
        }

        this.getdatalist();
      }
      getPageData() {
          console.log(this.sourcelimitval.limit, this.sourcelimitval.page_count);
          if (this.sourcelimitval.limit != 0 && this.sourcelimitval.limit != null && this.sourcelimitval.page_count != 0 && this.sourcelimitval.page_count != null) {
            this.getdatalist();
            this.getDataListCount();
          }
      }
    // nextpage(){
    //     let count = this.sourcelimitval.skip + 25;
    //     this.sourcelimitval.skip = count;
    //     console.log(count,'+');
    //     if (count<= 0) {
    //         this.sourcelimitval.skip = 25;
    //         this.getdatalist();
    //       } else {
    //         this.getdatalist();
    //       }
    //   }
    //   previouspage(){

    //     let count = this.sourcelimitval.skip - 25;
    //     this.sourcelimitval.skip = count;
    //     console.log(count,'-');
    // if (count>= 0) {
    //     this.getdatalist();
    //   }
    // }
    getdatalist() {
        console.log(this.sourceconditionval, 'this.sourceconditionval');
        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        if (this.sourcelimitval != null && typeof (this.sourcelimitval) != 'undefined' && typeof (this.sourcelimitval.skip) != 'undefined') {
            this.sourcelimitval.skip = (parseInt(this.sourcelimitval.page_count) - 1) * parseInt(this.sourcelimitval.limit);
        }
        this._http.post(link, { source: this.sourceval, condition: this.sourceconditionval, sourcelimit: this.sourcelimitval })
            .subscribe(res => {
                let result;
                result = res;
                if (result.status == 'error') {
                    this.router.navigate(['/']);
                } else {
                    this.datalist = [];
                    this.datalist = result.res;
                    for (const i in this.datalist) {
                        if (this.datalist[i].youtube_url != null) {
                            const videourl = this.datalist[i].youtube_url.split('v=');
                            const videoid = videourl[videourl.length - 1];
                            const vurl = videoid;
                            let url = this.datalist[i].youtube_url.replace('watch?v=', 'embed/');
                            this.datalist[i].youtube_url = this.sanitizer.bypassSecurityTrustResourceUrl(url + '?autoplay=1');
                            url = url.split('/');
                            const urlid = url[url.length - 1];
                            this.datalist[i].thumbnail_youtube = this.sanitizer.bypassSecurityTrustResourceUrl('https://i1.ytimg.com/vi/' + urlid + '/0.jpg');
                            this.autoplayVideo[this.datalist[i]._id] = 0;
                        }
                    }
                }
            }, error => {
                this.datalist = [];
            });
    }

    geteditdata() {
        const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
        let sourcevalue: any = '';
        if (this.router.url === '/manage-leads') {
           sourcevalue = this.editsourceval;
        } else {
            sourcevalue = this.sourceval;
        }
        this._http.post(link, { source: sourcevalue, condition: { _id: this.selecteditem._id } })
            .subscribe(res => {
                let result;
                result = res;
                if (result.status == 'error') {
                    this.router.navigate(['/']);
                } else {
                    let folder: any = '';
                    for (const c in this.dataForm.controls) {
                        this.dataForm.controls[c].patchValue(result.res[0][c]);
                        for (const j in this.formdataval) {
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'daterange') {
                                $('#inputdate' + this.formdataval[j].name).val(this.showdate(result.res[0][c]));
                                const bsValue = new Date(result.res[0][c][0]);
                                const maxDate = new Date(result.res[0][c][1]);
                                const datearr = [bsValue, maxDate];
                                this.dataForm.controls[c].patchValue(datearr);
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'dateis') {
                                const a = result.res[0][c].split('T');
                                $('#inputdateis' + this.formdataval[j].name).val(moment(a[0]).format('MM-DD-YYYY'));
                                const bsValue = new Date(result.res[0][c][0]);
                                const maxDate = new Date(result.res[0][c][1]);
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'timeis') {
                                if (this.formdataval[j].name == 'start_time') {
                                    const sttime = new Date();
                                    const spl = result.res[0][c].split(':');
                                    sttime.setHours(spl[0]);
                                    sttime.setMinutes(spl[1]);
                                    this.start_time = sttime;
                                }
                                if (this.formdataval[j].name == 'end_time') {
                                    const sttime = new Date();
                                    const spl = result.res[0][c].split(':');
                                    sttime.setHours(spl[0]);
                                    sttime.setMinutes(spl[1]);
                                    this.end_time = sttime;
                                }
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'checkbox') {
                                let checkval = result.res[0][c];
                                if (result.res[0][c] == 1) { checkval = true; } else { checkval = false; }
                                this.dataForm.controls[c].patchValue(checkval);
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'image') {
                                folder = this.formdataval[j].imagefolder;
                                const link = this._commonservice.base64encode + '&img=' + this.dataForm.controls[c].value + '&type=' + folder;
                                this._http.get(link)
                                    .subscribe(res => {
                                        let result: any;
                                        result = res;
                                        if (result.data != null) {
                                            this.unsafebase64imgdata[j] = result.data;
                                            this.croppedImage[j] = result.data;
                                        }
                                    }, error => {
                                        console.log('Oooops!');
                                    });
                            }
                            if (this.formdataval[j].name == c && this.formdataval[j].inputtype == 'file') {
                                this.percentageis[j] = 100;
                                this.lengthis[j] = 1;
                                this.flag = 0;
                                this.nameis[j] = result.res[0][c];
                            }
                        }
                    }
                    this.dataForm.addControl('id', new FormControl(this.selecteditem._id, Validators.required));
                }
            }, error => {
                this.datalist = [];
            });
    }
    // getselectdata(source: any, c: any) {
    //     if (this.formdataval[c].sourcetype == null || this.formdataval[c].sourcetype != 'static') {
    //         const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
    //         this._http.post(link, { source: source })
    //             .subscribe(res => {
    //                 let result;
    //                 result = res;
    //                 if (result.status == 'error') {
    //                     this.router.navigate(['/']);
    //                 } else {
    //                     this.formdataval[c].sourceval = result.res;
    //                 }
    //             }, error => {
    //                 this.formdataval[c].sourceval = [];
    //             });
    //     } else {
    //         this._http.get("assets/data/" + source + ".json")
    //             .subscribe(res => {
    //                 let result;
    //                 this.formdataval[c].sourceval = result = res;
    //             }, error => {
    //                 this.formdataval[c].sourceval = [];
    //             });
    //     }

    // }
    getselectdata(source: any, c: any) {
        if (source.source != 'null' && (this.formdataval[c].sourcetype == null || this.formdataval[c].sourcetype != 'static')) {
            const link = this._commonservice.nodesslurl + 'datalist?token=' + this.cookeiservice.get('jwttoken');
            this._http.post(link, source)
                .subscribe(res => {
                    let result;
                    result = res;
                    if (result.status == 'error') {
                        this.router.navigate(['/']);
                    } else {
                        this.formdataval[c].sourceval = result.res;
                    }
                }, error => {
                    this.formdataval[c].sourceval = [];
                });
        } else if (source.source == 'null' && this.formdataval[c].sourcetype != 'static') {
// console.log('hihihhhih');
const link = this._commonservice.nodesslurl + 'complete_traning_catagory_by_user';
this._http.post(link, source)
                .subscribe((res: any) => {
                    // console.log(res,'===')
                    if (res.status == 'error') {
                        this.router.navigate(['/']);
                    } else {
                        // console.log(res.data,"++")
                        const training_lesson_count_val: any = res.data.training_lesson_count;
                        const complete_traning_catagory_by_user_val: any = res.data.complete_traning_catagory_by_user;
                        const alldata: any = [];
                        for (const item of training_lesson_count_val) {
                            // console.log(item);
                            for (const complete_traning of complete_traning_catagory_by_user_val) {
                                // console.log(item.count, '++++',complete_traning.lessondone);
                                if (item._id == complete_traning.trainingcategory && item.count <= complete_traning.lessondone && item.product_name != null) {
                                    console.log('test success', item);
                                    alldata.push(item);
                                }
                            }
                        }
                        console.log(alldata);
                        this.formdataval[c].sourceval = alldata;
                    }
                });
        } else {
             console.log(source, '++++');
            this._http.get('assets/data/' + source + '.json')
                .subscribe(res => {
                    let result;
                    this.formdataval[c].sourceval = result = res;
                }, error => {
                    this.formdataval[c].sourceval = [];
                });
        }
    }

    deletdata(val: any, template: TemplateRef<any>) {
        this.modalRef1 = this.modal.show(template);
        this.selecteditem = val;
    }

    confirmdelete(template: TemplateRef<any>) {
        this.modalRef1.hide();
        this.isedit = 0;
        this.message = 'Record deleted successfully!!';
        const link = this._commonservice.nodesslurl + 'deletesingledata?token=' + this.cookeiservice.get('jwttoken');
        this._http.post(link, { source: this.formsourceval.table, id: this.selecteditem._id })
            .subscribe(res => {
                let result;
                result = res;
                this.getdatalist();
                this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                setTimeout(() => {
                    this.modalRef1.hide();
                    this.isedit = 0;
                }, 4000);
            }, error => {
                console.log('Oooops!');
            });

    }
    nodelete() {
        this.modalRef1.hide();
    }

    marketingreview(val: any, template: TemplateRef<any>) {
       const link = this._commonservice.nodesslurl + 'marketingreview';
       this.selectedlead.rep_id = this.cookeiservice.get('userid');
       this.selectedlead.product_ids = this.selectedproductid;
       const data = this.selectedlead;
       if (this.selectedproductid != '') {
        this._http.post(link, data).subscribe((res: any) => {
            // console.log('ok',res);
            if (res.status == 'success') {
                const link1 = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
                const data = {
                    source: 'leads',
                    data: { id: this.selectedlead._id, emailStatus: 'send' }
                };
                this._http.post(link1, data).subscribe((res1: any) => {
                    console.log(res1, '+++res1');
                    this.getdatalist();
             });
                this.modalRef2.hide();
                this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                setTimeout(() => {
                    this.modalRef1.hide();
                }, 2000);
            }
        });
       }
    }


    contractReview(val: any, template: TemplateRef<any>) {
        const link = this._commonservice.nodesslurl + 'contractreview';
        this.selectedlead.rep_id = this.cookeiservice.get('userid');
        this.selectedlead.product_ids = this.selectedproductid;
        const data = this.selectedlead;
        if (this.selectedproductid != '') {
            this._http.post(link, data).subscribe((res: any) => {
                // console.log('ok',res);
                if (res.status == 'success') {
                    const link1 = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
                    const data = {
                        source: 'leads',
                        data: { id: this.selectedlead._id, emailStatus: 'send' }
                    };
                    this._http.post(link1, data).subscribe((res1: any) => {
                        console.log(res1, '+++res1');
                    });
                    this.modalRef2.hide();
                    this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                    setTimeout(() => {
                        this.modalRef1.hide();
                    }, 2000);
                }
            });
        }
    }

    validateEmail(email) {
        const re = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
        return re.test(email);
        }

    leadsMarketingEmail(val: any,  template: TemplateRef<any>) {
        // console.log(this.sendLeadEmailForm.value);
        // return;
        const emails = this.sendLeadEmailForm.value.email.split(',');
        // console.log(val.product_id);
        // return;
        let x: any;
        for (x in this.sendLeadEmailForm.controls) {
            this.sendLeadEmailForm.controls[x].markAsTouched();
          }
        // var invalidEmails = [];

        // for (let i = 0; i < emails.length; i++) {
        //     if (this.validateEmail(emails[i].trim())) {
        //         invalidEmails.push(emails[i].trim())
        //     }
        // }
        // if (this.sendLeadEmailForm.valid) {
        console.log(this.invalidEmails);
        if (val.email != null && val.product_id != null) {
            this.leadIsSubmit = 0;
            const link = this._commonservice.nodesslurl + 'newleadformarketingreview';
            const data = {email: emails, product_id: val.product_id, rep_id: this.cookeiservice.get('userid'), created_by: this.cookeiservice.get('userid')};
            this._http.post(link, data).subscribe((res: any) => {
                if (res.status == 'error') {
                console.log(res);
                    this.emailexist = res.msg;
                } else if (res.status == 'success') {
                    this.openFlag = 0;
                    this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                    setTimeout(() => {
                        this.modalRef1.hide();
                    }, 2000);
                }
                this.emailexist = '';
            });
        } else {
            this.leadIsSubmit = 1;
            this.openFlag = 0;
        }
        console.log(val);

    // }
    }


    editmodal(template: TemplateRef<any>, selecteddata: any) {
        this.selecteditem = selecteddata;
        this.isedit = 1;
        this.openform(template, this.isedit);

    }
    openform(template: TemplateRef<any>, type) {
        this.nameis = [];
        this.percentageis = [];
        this.lengthis = [];
        if (type == 0) { this.isedit = 0; }
        const formgrp: any = [];
        this.base64imgdata = [];
        this.unsafebase64imgdata = [];
        for (const c in this.formdataval) {
            if (this.isedit == 0 || (this.formdataval[c].isaddonly == null && this.formdataval[c].isaddonly != true)) {
                this.start_time = '';
                this.end_time = '';
                if (this.formdataval[c].inputtype == 'checkbox') {
                    formgrp[this.formdataval[c].name] = [false];
                } else if (this.formdataval[c].inputtype == 'dateis') {
                    formgrp[this.formdataval[c].name] = [moment().format('MM-DD-YY'), Validators.required];
                } else {
                    const tempdefault = [];
                    if (this.formdataval[c].multiple != null && this.formdataval[c].multiple == true) {}
                    // console.log(tempdefault);

                    if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.required) { formgrp[this.formdataval[c].name] = [tempdefault, Validators.required]; }
                    if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.email) { formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])]; }
                    if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.confirmpass) { formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, this.equalToPass('password')])]; }
                    if (this.formdataval[c].validationrule != null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) { formgrp[this.formdataval[c].name] = [tempdefault]; }
                    if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value == null) { formgrp[this.formdataval[c].name] = [tempdefault]; }
                    if (this.formdataval[c].validationrule == null && !this.formdataval[c].validationrule && this.formdataval[c].value != null) { formgrp[this.formdataval[c].name] = [this.formdataval[c].value]; }
                    if (this.formdataval[c].validationrule != null && this.formdataval[c].validationrule.url) { formgrp[this.formdataval[c].name] = [tempdefault, Validators.compose([Validators.required, Validators.pattern('^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?|^((http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$')])]; }
                    if (this.formdataval[c].inputtype == 'select') {
                        this.getselectdata(this.formdataval[c].sourceview, c);
                    }
                    this.imageChangedEvent = [];
                    this.croppedImage = [];

                }

                if (this.formdataval[c].role != null) {
                    if (this.formdataval[c].role.indexOf(this.usertype) == -1) {
                        this.formdataval[c].inputtype = 'hidden';
                        setTimeout(() => {
                            this.dataForm.controls[this.formdataval[c].name].patchValue(this.cookeiservice.get(this.formdataval[c].defaultval));
                        }, 1000);
                    }
                }
            }
        }
        this.dataForm = this.formgroup.group(formgrp);
        if (this.isedit == 1) {
            this.geteditdata();

        }

        const config: ModalOptions = {
            backdrop: 'static',
            keyboard: false,
            animated: true,
            ignoreBackdropClick: true,
            initialState: {
                data1: 'new-user',
                username: 'test'
            }
        };
        this.modalRef = this.modal.show(template, config);
    }

    equalToPass(fieldname): ValidatorFn {                                 // password match custom function
        return (control: AbstractControl): { [key: string]: any } => {      /// abstractcontrol function call here with key string any type

            const input = control.value;      // class create here
            const isValid = control.root.value[fieldname] == input;       // value valid or not
            if (!isValid) {
                return {
                    equalTo: true            // this value will be called
                };
            }
        };
    }

    // not relevant for now !!
    equalpass() {
        if (this.dataForm != null) {
            if (this.dataForm.controls['confirmpassword'] == null || this.dataForm.controls['confirmpassword'].value == '') {
                return { 'equalpass': true };
            }
            if (this.dataForm.controls['password'] != this.dataForm.controls['confirmpassword']) {
                return { 'equalpass': true };
            }
            return null;
        }
    }

    formsubmit() {
        this.issubmit = 1;
        if (this.start_time != null && this.start_time != '') {
            this.dataForm.controls['start_time'].patchValue(this.start_time);
        }
        if (this.end_time != null && this.end_time != '') {
            this.dataForm.controls['end_time'].patchValue(this.end_time);
        }
        let y: any;
        for (y in this.dataForm.controls) {
            this.dataForm.controls[y].markAsTouched();
        }

        if (this.formsourceval.table == 'events') {
            let tzval = this.dataForm.controls['timezone'].value.split('|');
            tzval = tzval[1];
            this.dataForm.controls['start_date'].patchValue(moment(this.dataForm.controls['start_date'].value).format('YYYY-MM-DD'));
            this.dataForm.controls['end_date'].patchValue(moment(this.dataForm.controls['end_date'].value).format('YYYY-MM-DD'));
            this.dataForm.controls['start_time'].patchValue(moment(this.dataForm.controls['start_time'].value).format('HH:mm'));
            this.dataForm.controls['end_time'].patchValue(moment(this.dataForm.controls['end_time'].value).format('HH:mm')); /*.tz(tzval)*/

        }
        if (this.dataForm.valid && this.submitval == 1) {
            console.log(this.dataForm.value);
            const link = this._commonservice.nodesslurl + 'addorupdatedata';
            this._http.post(link, { source: this.formsourceval.table, data: this.dataForm.value, sourceobj: this.formsourceval.objarr })
                .subscribe(res => {
                    let result: any;
                    result = res;
                    this.issubmit = 0;
                    if (result.status == 'success') {
                        this.isedit = 0;
                        setTimeout(() => {
                            this.getdatalist();
                            this.imageChangedEvent = [];
                            this.croppedImage = [];
                            this.modalRef.hide();
                            this.dataForm.reset();
                        }, 2000);

                    }
                }, error => {
                    console.log('Oooops!');
                });
        }
    }

    rangeSelected($event, controlname: any) {
        const dval = moment.unix($event.start).unix() + '|' + moment.unix($event.end).unix();
        this.dataForm.controls[controlname].patchValue(dval);
    }

    showsingledate(dateis) {
        const st = moment(dateis).format('MM/DD/YYYY');
        return st;
    }
    showtime(dateis) {
        //   var timeString = "09:00:00";
        let timeString = dateis + ':00';
        const H = +timeString.substr(0, 2);
        const h = (H % 12) || 12;
        const ampm = H < 12 ? ' AM' : ' PM';
        timeString = h + timeString.substr(2, 3) + ampm;
        return timeString;
    }
    showdate(dateis) {
        let st = dateis[0];
        let endt = dateis[1];
        st = moment(st).format('MMM Do YY');
        endt = moment(endt).format('MMM Do YY');
        return st + ' To ' + endt;
    }
    showrealdate(dateis) {
        if (dateis == null || dateis.length < 3) { return 'N/A'; }
        // console.log(moment().unix(dateis/1000).format('MMM Do YY'));
        return moment(dateis).format('MM/DD/YYYY');
    }

    getdaterangeval(dateis) {
        if (dateis != null) {
            const datearr = dateis.split('|');
            return moment.unix(datearr[0] / 1000).format('MM/DD/YYYY') + '-' + moment.unix(datearr[1] / 1000).format('MM/DD/YYYY');
        } else {
            return 'No date selected!';
        }
    }
    saveimg(control: any, i: any, template: TemplateRef<any>) {
        const uploadData = new FormData();
        if (this.selectedFile == null) { this.selectedFile = 0; }
        uploadData.append('file', this.selectedFile);
        uploadData.append('base64data', this.croppedImage[i]);
        const link = this._commonservice.uploadurl + '?imagefolder=' + control.imagefolder;
        this._http.post(link, uploadData)
            .subscribe(event => {
                let res: any = {};
                res = event;
                if (res.error_code == 0) {
                    this.dataForm.controls[control.name].patchValue(res.filename);
                    this.formdataval[i].filename = control.imagefolder + '/' + res.filename;
                    this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                    this.message = 'Image Saved Successfully !!';
                    setTimeout(() => {
                        this.modalRef1.hide();
                    }, 5000);
                }
            });
    }
    // for image crop
    fileChangeEvent(event: any, i: any): void {
        this.selectedFile = event.target.files[0];
        this.imageChangedEvent[i] = event;
    }
    imageCropped(event: ImageCroppedEvent, item: any, i: any) {
        this.croppedImage[i] = event.base64;
    }
    imageLoaded() {
        // show cropper
    }
    loadImageFailed() {
        // show message
    }
    gotorepdetails(idis) {
    }

    get sellingPoints() {
        return this.productForm.get('selling_points') as FormArray;
      }

      /////// This is new /////////////////

      addSellingPoint() {
        // this.sellingPoints.push(this.formgroup.group({point:''}));
      }

      deleteSellingPoint(index) {
        this.sellingPoints.removeAt(index);
      }

    onUploadOutput(control: any, i, output: UploadOutput): void {
        console.log(control);
        // return;
        if (output.type === 'allAddedToQueue') {
            if (this.router.url == '/belk-upload') {
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: this._commonservice.nodesslurl + 'uploads-csv',
                    method: 'POST',
                };
                this.uploadInput.emit(event);
            }
            if (this.router.url != '/belk-upload') {
                const data = {
                    bucketname: control.img_record.bucketname,
                    type: control.img_record.type
                };
                console.log(data, '++++++++++++++++');
                const event: UploadInput = {
                    type: 'uploadAll',
                    url: this._commonservice.nodesslurl + 'uploads?path=' + control.img_record.path + '&prefix=' + control.img_record.prefix,
                    method: 'POST',
                    data: data
                };
                this.uploadInput.emit(event);
            }
        } else if (output.type === 'addedToQueue' && typeof output.file !== 'undefined') {
            if (output.file.response != '') {
                this.files = [];
                console.log(output, '++++ outputs');
                this.files.push(output.file);
                this.lengthis[i] = this.files.length;
                this.percentageis[i] = this.files[0].progress.data.percentage;
            }
        } else if (output.type === 'uploading' && typeof output.file !== 'undefined') {

            console.log(output, '++++ uploading');
            const index = this.files.findIndex(file => typeof output.file !== 'undefined' && file.id === output.file.id);
            this.files[index] = output.file;

            this.lengthis[i] = this.files.length;
            this.percentageis[i] = this.files[0].progress.data.percentage;
        } else if (output.type === 'removed') {
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') {
            this.dragOver = true;
        } else if (output.type === 'dragOut') {
            this.dragOver = false;
        } else if (output.type === 'drop') {
            this.dragOver = false;
        }
        if (this.percentageis[i] == 100) { this.flag = 1; }
        if (this.percentageis[i] == 100 && this.flag == 1) {
            this.addtodataform(control, i);
        }
    }
    addtodataform(control: any, i) {
        // console.log(control, i,'+++++')
        this.nameis[i] = this.files[0].name;
        if (this.files[0].response != undefined && this.router.url == '/belk-upload') {
            this.csvHeaderAllData = this.files[0].response;
        }
        const filelocalname = control.name + 'localname';
        this.dataForm.controls[control.name].patchValue(this.files[0].response);
        this.dataForm.controls[filelocalname].patchValue(this.files[0].name);
        this.formdataval[i].filename = this.files[0].name;

    }
    showstatusofrep(item) {
        if (item.noofclinics == null && (item.password == null || item.password == '')) { return 'Not Qualified'; }

        //  if((item.noofclinics<40 || item.noofclinics==null) && (item.password!='' && item.password!=null)) return 'Not Qualified';

        if ((item.noofclinics < 12 || item.noofclinics == null) && (item.password == '' || item.password == null)) { return 'Not Qualified'; }

        if (item.noofclinics == null && (item.password != null && item.password != '')) {
            if (item.lock == 1) {
                return 'Pending Phone Verification';
            }
            if (item.signup_step2 == 1 && item.contractstep == null && item.reptraininglessonstep == null) { // && item.lock==0
                return 'Pending Contract';
            }
            if (item.signup_step2 == 1 && item.contractstep == 1 && item.reptraininglessonstep == null) { // && item.lock==0
                return 'Pending New Hire Training';
            }
            if (item.signup_step2 == 1 && item.contractstep == 1 && item.reptraininglessonstep == 1) { // && item.lock==0
                return 'Dashboard Access';
            }
        }



        if (item.noofclinics >= 12 && (item.password == null || item.password == '')) { return 'Pending Sign Up'; }

        if (item.lock == 1) {
            return 'Pending Phone Verification';
        }
        if (item.signup_step2 == 1 && item.contractstep == null && item.reptraininglessonstep == null) { // && item.lock==0
            return 'Pending Contract';
        }/*
        if(item.signup_step2==1  && item.contractstep==null && item.reptraininglessonstep==null) { // && item.lock==1
            return 'Pending Phone Verification';
        }*/
        if (item.signup_step2 == 1 && item.contractstep == 1 && item.reptraininglessonstep == null) { // && item.lock==0
            return 'Pending New Hire Training';
        }
        if (item.signup_step2 == 1 && item.contractstep == 1 && item.reptraininglessonstep == 1) { // && item.lock==0
            return 'Dashboard Access';
        }
    }
    showphoneno(phn) {
        if (phn != null && phn.length > 0) {
            phn = phn.replace(/ /g, '');
            phn = phn.replace(/-/g, '');
            return phn.slice(0, 3) + '-' + phn.slice(3, 6) + '-' + phn.slice(6, 10);
        } else {
            return 'N/A';
        }
        //  if(phn !=null) return '('+phn.slice(0,3)+')'+phn.slice(3,6)+'-'+phn.slice(6,10);


    }

    addeventform1class() {
        if (this.router.url == '/calendar' || this.router.url == '/event') { return 'newaddeventformclass '; } else { return ''; }
    }
    syncgoogle() {
        const link = this._commonservice.nodesslurl + 'modifyusercalender';
        const data = {
            userid: this.cookeiservice.get('userid'),
            email: this.cookeiservice.get('useremail')
        };
        this.loaderdiv = true;
        setTimeout(() => {
            this.loaderdiv = false;
        }, 10000);
        this._http.post(link, data)
            .subscribe(res => {
                let result: any;
                result = res;
                this.issubmit = 0;
                //  console.log(result);
                if (result.status == 'success') {
                    //   this.modalRef.hide();
                    this.isedit = 0;
                    setTimeout(() => {
                        this.getdatalist();
                        this.imageChangedEvent = [];
                        this.croppedImage = [];
                        this.modalRef.hide();
                        this.dataForm.reset();
                    }, 2000);

                }
            }, error => {
                console.log('Oooops!');
            });
    }

    // added by Chandrani
    notesdata(val: any, template: TemplateRef<any>) {
        this.selectedlead = val;
        setTimeout(() => {
            this.modalRef2 = this.modal.show(template);
        }, 2000);


    }
    openDiscoverCallModal(leadval: any, val: any, template: TemplateRef<any>) {
        // console.log(leadval,'++++')
        this.selectedlead = leadval;
        this.productlist = val;
        setTimeout(() => {
            this.modalRef2 = this.modal.show(template);
        }, 2000);


    }
    productsubmit(leadid: any) {
        if (this.selectedproductid == '') {
            this.productErrorFlag = 1;
        } else {
            this.productErrorFlag = 0;
            this.modalRef2.hide();
            setTimeout(() => {
                this.router.navigateByUrl('/book-a-closer/' + leadid + '/' + this.selectedproductid);
            }, 50);

        }

    }

    showInputText(event: any) {
        if (event.target.checked == true) {
            this.inputflag = 1;
        } else { this.inputflag = 0; }

    }

    showInputText1(event: any) {
        if (event.target.checked == true) {
            console.log('okokok');
            this.inputflag_launch_date = 1;
        } else { this.inputflag_launch_date = 0; }

    }

    iframeAutoplay(id: any) {
        $( '.playerspan' ).each(function( index ) {
            $( this ).removeClass( 'show' );
            $( this ).addClass( 'hide' );
            // $( this ).html("");                  //if there is any need to reload the span
          });
          $( '.iframgeimg' ).each(function( index ) {
            $( this ).removeClass( 'hide' );
            $( this ).addClass( 'show' );

          });

            setTimeout(() => {
                $('#iframe_span_' + id).removeClass('hide');
                $('#iframe_span_' + id).addClass('show');
                $('#thumb' + id).addClass('hide');
            }, 500);



    }

    toggleStatusInArray(item) {
        if (item.status == null) {item.status = 'Pending'; }
        $('.statusspan').removeClass('hide');
        $('.statusspan').addClass('show');
        $('.selectintable').removeClass('show');
        $('.selectintable').addClass('hide');
        $('#span' + item._id).removeClass('show');
        $('#span' + item._id).addClass('hide');
        $('#select' + item._id).removeClass('hide');
        $('#select' + item._id).addClass('show');



        // $('#select'+item._id).removeClass('hide');
        // $('#select'+item._id).addClass('show');
    }

    toggleFromSelect(event: any, item: any) {
        let status: any;
        status = event;
        this.selectedstatus = status;
        const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
        /* console.log('link');
         console.log(link);*/
         const data  = {
            source: this.formsourceval.table,
            data: { id: item._id, status: status}
          };
        this._http.post(link, {
            source: this.formsourceval.table,
            data: { id: item._id, status: status}}
          )
            .subscribe(res => {
                this.getdatalist();
            }, error => {
                this.getdatalist();
            });
    }

    openPricepointModal(item: any, template: TemplateRef<any>) {
        this.selectedlead = item;
        this.modalRef2 = this.modal.show(template);
    }
    addYoutubeLink(template: TemplateRef<any>) {
        if (this.videolink != '' && this.videolink != null ) {
            const link = this._commonservice.nodesslurl + 'adddiscoverycall';
            const data = {
                source: 'leads',
                data: { id: this.selectedlead._id, fullname: this.selectedlead.fullname, email: this.selectedlead.email, rep_name: this.selectedlead.rep_name, rep_id: this.selectedlead.created_by, youtube: {'link': this.videolink, product_id: this.selectedproductid} }
                // data: { id: this.selectedlead._id, youtube:{'link': this.videolink} }
            };
            this._http.post(link, data).subscribe((res: any) => {
                console.log(res);
                if (res.status == 'success') {
                    this.modalRef2.hide();
                    this.selectedproductid = '';
                    this.modalRef1 = this.modal.show(template, { class: 'successmodal' });
                    setTimeout(() => {
                        this.modalRef1.hide();
                    }, 2000);
                }
                this.getdatalist();
            }, error => {
                this.getdatalist();
            });
            // console.log(data, '++++')
        } else {

        }

    }
    addPrice() {
        if (this.pricepoint == '' || this.pricepoint == null ) {
            this.issubmitprice = 1;
        } else {
            const link = this._commonservice.nodesslurl + 'addorupdatedata?token=' + this.cookeiservice.get('jwttoken');
             const data  = {
                source: this.formsourceval.table,
                data: { id: this.selectedlead._id, pricepoint: this.pricepoint}
              };
            this._http.post(link, {
                source: this.formsourceval.table,
                data: { id: this.selectedlead._id, pricepoint: this.pricepoint}}
              )
                .subscribe(res => {
                    this.pricepoint = '';
                    this.getdatalist();
                    this.modalRef2.hide();
                }, error => {
                    this.pricepoint = '';
                    this.getdatalist();
                });
        }

    }

}
