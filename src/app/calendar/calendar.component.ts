import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  upcommingTestDates = [{"date":new Date(2018,10,26),"subject":"History"},
  {"date":new Date(2018,10,23),"subject":"History"},
  {"date":new Date(2018,10,29),"subject":"History"},
  {"date":new Date(2018,11,5),"subject":"History"},
  {"date":new Date(2018,11,12),"subject":"History"}];

  constructor() { }

  ngOnInit() {
    this.upcommingTestDates.sort((a, b) => {
      return b.date.getTime() - a.date.getTime();
    });
  }

}
