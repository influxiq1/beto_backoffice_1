import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usergoogleevent',
  templateUrl: './usergoogleevent.component.html',
  styleUrls: ['./usergoogleevent.component.css']
})
export class UsergoogleeventComponent implements OnInit {
  public sourcecondition: any;
  public tabledatalist: any;
  public sourcelimit: any = {};
    constructor() {
        this.sourcecondition = {};
        this.tabledatalist = [
          { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
          { value: 'email', name: 'Email', role: 0, func: '', class: 'type', type: 'text' },
          { value: 'startdate', name: 'Start Date', role: 0, func: '', class: 'type', type: 'text' },
          { value: 'start', name: 'Start', role: 0, func: '', class: 'type', type: 'text' },
          { value: 'end', name: 'End', role: 0, func: '', class: 'type', type: 'text' },
          { value: 'insertedon', name: 'Insertedon ', role: 0, func: '', class: 'insertedon', type: 'unixTime' }
        ];
        this.sourcelimit = { 'skip':0, 'limit':10, 'page_count': 1};
     }
  
  ngOnInit() {
  }

}
