import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  today = new Date();
  upcommingTestDates = [{"date":new Date(2018,10,26),"subject":"History"},
  {"date":new Date(2018,10,23),"subject":"NE"},
  {"date":new Date(2018,10,22),"subject":"NE"},
  {"date":new Date(2018,10,29),"subject":"Mat"},
  {"date":new Date(2018,11,5),"subject":"Fizika"},
  {"date":new Date(2018,11,12),"subject":"Bel"}];

  constructor() { }

  ngOnInit() {
    this.upcommingTestDates.sort((a, b) => {
      return a.date.getTime() - b.date.getTime() ;
    });
  }

  checkDueDate(testDate: Date){
    if(testDate.getFullYear()>=this.today.getFullYear()){
      if(testDate.getMonth()>this.today.getMonth()){
        return true;
      }else if(testDate.getMonth()==this.today.getMonth()){
        if(testDate.getDate()>=this.today.getDate()){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

}
