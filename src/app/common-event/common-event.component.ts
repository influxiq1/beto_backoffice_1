import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-common-event',
  templateUrl: './common-event.component.html',
  styleUrls: ['./common-event.component.css']
})
export class CommonEventComponent implements OnInit {
  public sourcecondition: any;
  public tabledatalist: any;
  public sourcelimit: any = {};
    constructor() {
        this.sourcecondition = {};
        this.tabledatalist = [
          { value: 'id', name: 'Id', role: 0, func: '', class: 'id', type: '#' },
          { value: 'email', name: 'Email', role: 0, func: '', class: 'email', type: 'text' },
          { value: 'date', name: 'Date', role: 0, func: '', class: 'date', type: 'text' },
          { value: 'slot', name: 'Slot', role: 0, func: '', class: 'slot', type: 'text' },
          { value: 'insertedon', name: 'Insertedon ', role: 0, func: '', class: 'insertedon', type: 'unixTime' }
        ];
    this.sourcelimit = { 'skip':0, 'limit':10, 'page_count': 1};
     }
  ngOnInit() {
  }

}
