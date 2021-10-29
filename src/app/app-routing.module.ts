import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CalendarService } from './calendar.service';
import { BookSlotsComponent } from './calender-management/book-slots/book-slots.component';

const routes: Routes = [
  // {
  //   path: 'calender-management',
  //   loadChildren: () => import('./calender-management/calendar-management.module').then(m => m.CalendarManagementModule)
  // },


  {
    path: 'calender-management/calendar/book-appointment', component: BookSlotsComponent,
    
  },
  {
    path: 'calender-management/calendar/book-appointment/bioenergetics', component: BookSlotsComponent,
    resolve: { eventdayarrData: CalendarService },
    data: {
      requestcondition: {
        source: 'events_eventdayarr_view',
        condition: {
          event_type: 6
        }
      },
      // api_url: environment.api_calender_url,
      endpoint: 'view-event-eventdayarr'
    }
  },
  {
    path: 'calender-management/calendar/book-appointment/PECE/TMFlow', component: BookSlotsComponent,
    resolve: { eventdayarrData: CalendarService },
    data: {
      requestcondition: {
        source: 'events_eventdayarr_view',
        condition: {
          event_type: 4
        }
      },
      // api_url: environment.api_calender_url,
      endpoint: 'view-event-eventdayarr'
    }
  },
  {
    path: 'calender-management/calendar/book-appointment/warranty', component: BookSlotsComponent,
    resolve: { eventdayarrData: CalendarService },
    data: {
      requestcondition: {
        source: 'events_eventdayarr_view',
        condition: {
          event_type: 5
        }
      },
      // api_url: environment.api_calender_url,
      endpoint: 'view-event-eventdayarr'
    }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
