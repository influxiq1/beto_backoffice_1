import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


// const api_url = environment['api_url'];

const routes: Routes = [



  { path: '', redirectTo: 'calendar-management', pathMatch: 'full' },

 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarManagementRoutingModule { }
