import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Commonservices } from '../app.commonservices';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lead-contract',
  templateUrl: './lead-contract.component.html',
  styleUrls: ['./lead-contract.component.css'],
  providers: [Commonservices]
})
export class LeadContractComponent implements OnInit {
public all_data: any;
public modalref: any;
modalRef1: BsModalRef;
public today: any = new Date;
public degitalSignForm: FormGroup;
public degitalSignFormSubmitFlug = false;
public agreementForm: FormGroup;
public agreementFormSubmitFlug = false;
public isSubmit: number;

  constructor(
    public route: ActivatedRoute,
    protected _sanitizer: DomSanitizer,
    public modalservices: BsModalService,
    public formBuilder: FormBuilder,
    public _http: HttpClient,
    public router: Router,
    public cookeiservice: CookieService,
    public _commonservice: Commonservices) { }

  ngOnInit() {
    this.route.data.forEach((data: any ) => {
      console.log(data.results.res[0]);
      this.all_data = data.results.res[0];
   });

   this.degitalSignForm = this.formBuilder.group({
    fullName:   [ '', [ Validators.required, Validators.maxLength(150) ] ],
  });
  }
  safeHtml(html) {
    return this._sanitizer.bypassSecurityTrustHtml(html);
  }
  /* Open Modal */
  openModal(template: TemplateRef<any>) {
    this.modalref = this.modalservices.show(template, {class: 'signmodal'});
  }

  degitalSignFormSubmit() {
    this.degitalSignFormSubmitFlug = true;
    if (this.degitalSignForm.valid) {
      this.isSubmit = 1;
      this.modalref.hide();
      this.degitalSignForm.reset();
    }
  }
  submitSign(template: TemplateRef<any>, val: any) {
    let status1: any;
    if (val == 1) {
      status1 = 'sends_Signed_Contract_to_Rep';
    } else {
      status1 = 'decline';
    }
    if (this.isSubmit == 1 ) {
    const link = this._commonservice.nodesslurl + 'addorupdate_for_lead';
      this._http.post(link,  { source: 'contract_repote', data: {
       id: this.all_data._id,
       notes: this.all_data.notes,
       notesByCM: this.all_data.notesByCM,
       status: status1,
       product: this.all_data.product,
       contentTop: this.all_data.contentTop,
       product_id: this.all_data.product_id,
       lead_id: this.all_data.lead_id,
       lead_digital_signature: this.degitalSignForm.value.fullName,
       lead_digital_signature_date: new Date().getTime(),
       contract_manager_id: this.all_data.contract_manager_id,
       rep_id: this.all_data.rep_id,
      //  updated_by: this.cookeiservice.get('userid')
        }})
          .subscribe((res: any) => {
            this.isSubmit == 0;
              if (res.status == 'success' && val == 1) {

                this.modalRef1 = this.modalservices.show(template, { class: 'successmodal' });
                window.open('https://api.influxhostserver.com/download?file=' + res.filename);
                setTimeout(() => {
                    this.modalRef1.hide();
                }, 4000);
          }
          });
    }
  }
  hideDigitalSignModal() {
    this.modalref.hide();
  }

}
