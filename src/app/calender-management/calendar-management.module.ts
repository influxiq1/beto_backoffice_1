import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from 'ngx-ckeditor';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,

    FormsModule, ReactiveFormsModule,
    CKEditorModule
  ],
  providers: [
    // CalendarService, 
    // { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ]
    ,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [

  ]
})
export class CalendarManagementModule { }
