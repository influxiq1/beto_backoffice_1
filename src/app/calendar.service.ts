import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { LoaderService } from './loader.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subscription, ReplaySubject } from 'rxjs';

export interface EndpointComponent {
  endpoint: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService implements Resolve<any> {
  public userparentid: any = '';
  private unsubscribe: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private apiservice: ApiService, private router: Router, private cookieService: CookieService, private http: HttpClient, public snackBar: MatSnackBar, private loaderService: LoaderService) {
    if (this.cookieService.get('parentid') != null && typeof (this.cookieService.get('parentid')) !== 'undefined' && this.cookieService.get('parentid') !== '') {
      this.userparentid = JSON.parse(this.cookieService.get('parentid'));
    }
  }




  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // console.log(route, '==============', route.routeConfig.path)
    /* will come into play while editing otherwise no effect */
    let requestData: any = route.data.requestcondition;
    // requestData.condition = Object.assign(requestData.condition, route.params);
    requestData.condition = Object.assign(requestData.condition);

    // if (this.cookieService.check('jwt_for_calendar') === null) {
    this.apiservice.customRequest1({}, 'temptoken', environment['api_calender_url']).pipe(takeUntil(this.unsubscribe)).subscribe((response: any) => {
      this.cookieService.set('jwt_for_calendar', response.token, undefined, '/');
      // console.log(response.token, '======================+++++++++++++++++++++++++=======')
    });
    // }

    this.loaderService.isLoading.next(true);

    return new Promise((resolve) => {

      /* If endpoint is 'view-event-eventdayarr' then include 'timezone' with data */
      if (route.data.endpoint === 'view-event-eventdayarr' && this.cookieService.check('timezone')) {
        route.data.requestcondition.timezone = this.cookieService.get('timezone');
      }

      if (this.cookieService.check('type')) {
        if (JSON.parse(this.cookieService.get('type')) === 'client') {
          route.data.requestcondition.condition = Object.assign(
            route.data.requestcondition.condition, { userid: this.userparentid }
          );
        }

        if (JSON.parse(this.cookieService.get('type')) === 'closer') {
          route.data.requestcondition.condition = Object.assign(
            route.data.requestcondition.condition, { userid: JSON.parse(this.cookieService.get('userid')) }
          );
        }
        if (JSON.parse(this.cookieService.get('type')) === 'distributor') {
          // route.data.requestcondition.condition = Object.assign(
          //   route.data.requestcondition.condition, { userid: JSON.parse(this.cookieService.get('parentid')) }
          // );
        }
        // if (JSON.parse(this.cookieService.get('type')) === 'technological-consultant') {
        //   route.data.requestcondition.condition = Object.assign(
        //     route.data.requestcondition.condition, { userid: JSON.parse(this.cookieService.get('parentid')) }
        //   );
        // }
        if (JSON.parse(this.cookieService.get('type')) === 'admin') {
          // // console.log('mentor_id', route.params.mentor_id)
          // if (route.data.endpoint === 'view-event-eventdayarr') {
          //   route.data.requestcondition.condition = Object.assign(
          //     route.data.requestcondition.condition, { userid: JSON.parse(this.cookieService.get('userid')) }
          //   );
          // }
        }
        if (
          route.routeConfig.path =='manage-appointment/warranty/book-appointment/:flag/:user_id' ||  route.routeConfig.path =='manage-appointment/discovery/book-appointment/:product_id/:flag/:user_id/:user_email/:type'
        ) {
          console.log('tttttttttttttttttttttttttttttttttttttttttt');

          route.data.requestcondition.condition = Object.assign(
            route.data.requestcondition.condition, { start_datetime_unix: Math.round((new Date()).getTime()) + 172800000, next: 48 }
          );
          // this.configData.primaryCondition.event_type = 5;
          // this.configData.appName = ' Book Appointment For Warranty';
          // this.configData.patientInfoFormFields.push({
          //   type: 'input',
          //   name: 'start_datetime_unix',
          //   value: ,
          //   hidden: true,
          // });
        }
        if (route.routeConfig.path === 'manage-calendar/event-listing' && JSON.parse(this.cookieService.get('type')) !== 'admin') {
          route.data.requestcondition.condition = Object.assign(
            route.data.requestcondition.condition, { userid: JSON.parse(this.cookieService.get('userid')) }
          );
        }

        if (route.data.endpoint === 'view-event-eventdayarr') {
          // console.log('params', route.params)
          if (route.params.product_id != null && typeof (route.params.product_id) !== 'undefined') {
            route.data.requestcondition.condition = Object.assign(
              route.data.requestcondition.condition, { product_id: route.params.product_id }
            );
          }
        }


        if (route.data.endpoint === 'get-feedback-list') {
          if (JSON.parse(this.cookieService.get('type')) !== 'admin') {
            route.data.requestcondition.condition = { mentor_id: JSON.parse(this.cookieService.get('userid')) };
          } else {
            route.data.requestcondition.condition = {};
          }
        }

        requestData = Object.assign(requestData, {
          token: this.cookieService.get('jwt_for_calendar')
        });
      }

      if (route.data.method === 'get') {
        // // console.log('route.params', route.params);
        const params = Object.keys(route.params);
        // // console.log('params', params);
        let url: string = environment.api_calender_url + route.data.endpoint + '?';
        for (let i = 0; i < params.length; i++) {
          url += params[i] + '=' + route.params[params[i]];
          if (i < params.length - 1) { url += '&'; }
        }
        // console.log('url to get data', url);
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: this.cookieService.get('jwtToken')
          })
        };
        // const response = this.http.get(url, {});
        // // console.log('response', response);
        // return this.http.get(url, {});
        this.apiservice.getJsonObject(url).subscribe((response: any) => {
          if (response) {
            this.loaderService.isLoading.next(false);
            return resolve(response);
          } else {
            this.loaderService.isLoading.next(false);
            return true;
          }
        });
      } else {
        this.apiservice.customRequest1(requestData, route.data.endpoint, environment.api_calender_url).subscribe(apiobject => {

          if (apiobject) {
            this.loaderService.isLoading.next(false);
            return resolve(apiobject);
          } else { // id not found
            this.loaderService.isLoading.next(false);
            return true;
          }
        });
      }

    });
  }

  openSnackBar(message: string, action: string = null) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
