import { Component, OnInit, TemplateRef, Inject, Compiler } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

// import { BsModalService } from 'ngx-bootstrap/modal';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CookieService } from 'ngx-cookie-service';
import { WINDOW } from '@ng-toolkit/universal';
import { Commonservices } from '../../app.commonservices';
import { takeUntil, map } from 'rxjs/operators';
import { Subscription, ReplaySubject } from 'rxjs';
import * as momentImported from 'moment';
const moment = momentImported;
// import moment from "moment";
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from 'src/environments/environment';
import { ApiService } from 'src/app/api.service';
// import { DialogData } from 'listing-angular7';
import { MatDialogModule } from '@angular/material/dialog';
// import { DialogData } from 'listing-angular7';

// import { ApiService } from '../../services/api.service';
export interface DialogData {
  open: any;

}
@Component({
  selector: 'app-book-slots',
  templateUrl: './book-slots.component.html',
  styleUrls: ['./book-slots.component.css'],
  providers: [Commonservices]
})

export class BookSlotsComponent implements OnInit {


  // calendar management start

  private unsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  today = new Date();
  states: any = [];

  public configData: any = {
    appName: 'Book Appointment',
    jwtToken: '',
    baseUrl: environment['api_calender_url'],
    baseUrlCalendar: environment['api_calender_url'],
    checkAbilityUrl: environment['google_calendar_api'] + 'google-calendar-event/check-ability',
    google_calendar_api: environment['google_calendar_api'] + 'google-calendar-event/',

    endPoint: {
      add: 'add-or-update-event-data',
      datalist: 'datalist',
      deleteEvent: 'delete-single-event',
      viewEventSlots: 'view-event-eventdayarr',
      search: 'search',
      countSlot: 'count-slot',
      addToCalendar: 'add-to-calendar',
      getRefreshToken: 'get-refresh-token',
      getTokenInfo: 'getauthorization-pece-getuserdata',
      syncWithGoogle: 'get-events-from-google',
      insuranceDataManage: 'insurance-data-manage'
    },
    urls: [],
    timeZone: [
      { text: 'Alaska Standard Time', value: '-08:00|America/Anchorage' },
      { text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles' },
      { text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver' },
      { text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix' },
      { text: 'Central Standard Time', value: '-05:00|America/Chicago' },
      { text: 'Eastern Standard Time', value: '-04:00|America/New_York' },
      { text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu' },
    ],

    eventType: [
      { text: 'Wellness Consulting session', value: 1 },
      { text: 'Astrology session', value: 2 },
      { text: 'Constitutional Charting Session', value: 3 },
      { text: 'Energy Work Session', value: 4 }
    ],
    minDateForFilter: moment().add(2, 'days').format(),
    showCalendarInfo: false,
    bookingStep: ['Fill basic details'],
    patientInfoFormFields: [],
    calendarInfoFormFields: [],
    redirectUrl: '',
    primaryCondition: {}
  };
  // calendar management start
  public allslots;
  public timezoneval: any;
  public recid: any;
  public refreshtoken: any;
  public timezone: any = [];
  // public closeremails: any = [];
  public filterval5: any;
  public blockHeaderFooterBlock = true;
  public daterangepickerOptions = {
    startDate: '15/08/2019',
    endDate: '31/12/2019',
    format: 'MM/DD/YYYY',
    minDate: moment().format('MM/DD/YYYY'),
    noDefaultRangeSelected: true,
  };
  public headerText: any = {};
  public slotval: any;
  public slotView = true;

  public closerLeadForm: FormGroup;
  public medicalform: FormGroup;
  public closerLeadFormSubmitFlug = false;
  public allLeads: any;
  public leadsSuggestion: any = [];
  public leadsSuggestionFlug = false;
  public products: any = [];
  public timeSpanView = false;
  public timeSpanVal: any = '15';
  public loader = false;
  // public modalReference: BsModalRef;
  public selectedlead: any;
  public selectedproduct: any;
  public userdata: any;

  constructor(
    // @Inject(WINDOW) private window: Window, 
    // public dialog: MatDialog,  private router: 
    // Router,
     public _http: HttpClient,
    public cookeiservice: CookieService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public apiService: ApiService,
    public MatDialog: MatDialog
  ) {

    window.scrollTo(1000, 0);
    //   let userdata= this.cookeiservice.get('user_details')
    //  this.userdata= JSON.parse(userdata)
    // console.log(this.userdata, '123456789000000')
    // this._commonservice = _commonservice;

    this._http.get('assets/data/timezone.json')
      .subscribe(res => {
        let result;
        this.timezone = result = res;
        this.timezoneval = this.cookeiservice.get('timezone');
      }, error => {
        //console.log('Oooops!');
        // this.formdataval[c].sourceval = [];
      });

    /* Agreement Form Control */
    this.closerLeadForm = this.formBuilder.group({
      leads: [null, [Validators.required, Validators.maxLength(200)]],
      product: ['', [Validators.required, Validators.maxLength(200)]],
    });

    /* Agreement Form Control */
    this.closerLeadForm = this.formBuilder.group({
      leads: [null, [Validators.required, Validators.maxLength(200)]],
      product: ['', [Validators.required, Validators.maxLength(200)]],
    });


  }


  ngOnInit() {
    console.log(this.configData, 'configData');

    this.modal();

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
    this
    // console.log(this.activatedRoute.snapshot.params.product_id, 'this.activatedRoute.snapshot.params.product_id')
    this.setResponseData();
    this.setFormFields();

    if (this.activatedRoute.snapshot.routeConfig.path = '/calender-management/calendar/book-appointment/:user_id:/user_email/:product_id/:_id') {
      this.configData.redirectUrl = '/calender-management/event-booking-success/' + this.activatedRoute.snapshot.params.user_id;
    }
    this.configData.redirectUrl = '/calender-management/event-booking-success/' + this.activatedRoute.snapshot.params.user_id;

    this.configData.primaryCondition = { product_id: this.activatedRoute.snapshot.params.product_id }

  }
  modal() {
    let dialogRef = this.MatDialog.open(DialogEventTypeModal, {
      height: '400px',
      width: '600px',
    });
  }
  bookingSuccessListener(val) {
    console.log(val, '++++++++++')
    if (val.action == 'success') {
      this.apiService.customRequest1({ user_id: this.activatedRoute.snapshot.params.userid }, 'api/booking-event-data', environment['api_url']).subscribe((response: any) => {
        console.log(response.status, 'status successfully')
        if (response.status === 'success') {
          this.configData.redirectUrl = '/calender-management/event-booking-success/' + this.activatedRoute.snapshot.params.user_id;
        }
      });
    }
    // this.configData.redirectUrl = '/calender-management/event-booking-success/'+this.activatedRoute.snapshot.params.userid;
    // if(this.activatedRoute.snapshot.routeConfig.path='/calender-management/calendar/book-appointment/:userid/:product_id/:_id'){
    //   this.configData.redirectUrl = '/calender-management/event-booking-success/'+this.activatedRoute.snapshot.params.userid;
    // }
  }



  setFormFields() {


    this.configData.patientInfoFormFields.push(
      {
        type: 'textarea', name: 'notes', placeholder: 'Notes', label: 'Notes',
        value: '', validators: [Validators.required], error: 'Enter any notes',
        caption: 'Notes'
      },
      {
        type: 'input',
        name: 'booking_date',
        placeholder: 'Date',
        label: 'Booking date',
        value: moment().format('L'),
        disabled: true
      },
      { type: 'input', name: 'closeremail', value: this.activatedRoute.snapshot.params.user_email, hidden: true },
      { type: 'input', name: 'bookingUserEmail', value: this.activatedRoute.snapshot.params.user_email, hidden: true },
      { type: 'input', name: 'bookingUserId', value: this.activatedRoute.snapshot.params.user_id, hidden: true },
      { type: 'input', name: 'product_id', value: this.activatedRoute.snapshot.params.product_id, hidden: true }
    );
    this.configData.calendarInfoFormFields.push(
      {
        type: 'input',
        name: 'event_title',
        placeholder: 'Event Title',
        label: 'Event Title',
        value: '',
        disabled: true
      },
      {
        type: 'input',
        name: 'description',
        placeholder: 'Event Description',
        label: 'Event Description',
        value: '',
        disabled: true
      },
      {
        type: 'input',
        name: 'startdate',
        placeholder: 'Date of Appointment',
        label: 'Date of Appointment',
        value: '',
        disabled: true
      },
      {
        type: 'input',
        name: 'timespan',
        placeholder: 'Duration of Appointment',
        label: 'Duration of Appointment(min)',
        value: '',
        disabled: true
      },
      {
        type: 'input',
        name: 'slot',
        placeholder: 'Time of Appointment',
        label: 'Time of Appointment',
        value: '',
        disabled: true
      },
      {
        type: 'select', name: 'reqTimezone',
        label: 'Timezone',
        options: [
          { text: 'Alaska Standard Time', value: '-08:00|America/Anchorage' },
          { text: 'Pacific Standard Time', value: '-07:00|America/Los_Angeles' },
          { text: 'Mountain Standard Time(GMT-06:00)', value: '-06:00|America/Denver' },
          { text: 'Mountain Standard Time(GMT-07:00) (no DST)', value: '-07:00|America/Phoenix' },
          { text: 'Central Standard Time', value: '-05:00|America/Chicago' },
          { text: 'Eastern Standard Time', value: '-04:00|America/New_York' },
          { text: 'Hawaii Standard Time', value: '-10:00|Pacific/Honolulu' }
        ],
        value: '-05:00|America/Chicago', disabled: true
      },
      {
        type: 'input',
        name: 'username',
        placeholder: 'Organizer Name',
        label: 'Organizer Name',
        value: '',
        disabled: true
      },
      {
        type: 'input',
        name: 'useremail',
        placeholder: 'Organizer Email',
        label: 'Organizer Email',
        value: '',
        disabled: true
      }
    );

    // console.warn('this.configData', this.configData.patientInfoFormFields);
  }

  setResponseData() {
    this.activatedRoute.data.forEach((data) => {
      // console.log(data.eventdayarrData.data, 'activated')
      this.configData.jwtToken = this.cookeiservice.get('jwt_for_calendar');
      this.configData.responseData = data.eventdayarrData.data;
      console.log(this.configData.responseData, 'activated')
      // if (this.configData.responseData[0].event_type == 1) {
      //   this.configData.primaryCondition.event_type = 1;
      //   this.configData.appName = ' Book Appointment For Wellness Consulting session'
      // }
      // if (this.configData.responseData[0].event_type == 2) {
      //   this.configData.primaryCondition.event_type = 2;
      //   this.configData.appName = ' Book Appointment For Astrology session'
      // }
      // if (this.configData.responseData[0].event_type == 3) {
      //   this.configData.primaryCondition.event_type = 3;
      //   this.configData.appName = ' Book Appointment For Constitutional Charting Session'
      // }
      // if (this.configData.responseData[0].event_type == 4) {
      //   this.configData.primaryCondition.event_type = 4;
      //   this.configData.appName = ' Book Appointment For Energy Work Session'
      // }
    });

    // Merge logged in user details with the config data
    const userDetails: any = {
      _id: this.cookeiservice.get('_id'),
      firstname: this.cookeiservice.get('firstname'),
      lastname: this.cookeiservice.get('lastname'),
      email: this.cookeiservice.get('email')
    };
    this.configData = Object.assign(this.configData, userDetails);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  };
  // calendar management end
}



@Component({
  selector: 'eventtypemodal',
  templateUrl: 'eventtypemodal.html',
})
export class DialogEventTypeModal {

  constructor(
    public dialogRef: MatDialogRef<DialogEventTypeModal>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public router: Router,
  ) { }
  onNoClick() {
    this.router.navigateByUrl('/calender-management/calendar/book-appointment/warranty')
    this.dialogRef.close();
  }
}
