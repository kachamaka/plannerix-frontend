import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  currentDay;
  todayDay = new Date().getDay();
  // today = new Date("2018-11-31T16:00:00");

  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  constructor() { }
  displayedColumns: string[] = ['startTime', 'endTime','subject'];
  schedule = [
    [
    {"startTime": "7:30", "endTime": "8:10", "subject": "Kaka Emi"},
    {"startTime": "8:20", "endTime": "9:00", "subject": "Mat"},
    {"startTime": "9:10", "endTime": "9:50", "subject":"Rusgench"},
    {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
    {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
    {"startTime": "11:50", "endTime": "12:30", "subject": "FVS"},
    {"startTime": "12:40", "endTime": "13:20", "subject": "-"}
    ],[
      {"startTime": "7:30", "endTime": "8:10", "subject": "ZIP"},
      {"startTime": "8:20", "endTime": "9:00", "subject": "ZIP"},
      {"startTime": "9:10", "endTime": "9:50", "subject":"Nasko"},
      {"startTime": "10:10", "endTime": "10:50", "subject": "Zlatitu"},
      {"startTime": "11:00", "endTime": "11:40", "subject": "FVS"},
      {"startTime": "11:50", "endTime": "12:30", "subject": "AE"},
      {"startTime": "12:40", "endTime": "13:20", "subject": "AE"}
    ],[
      {"startTime": "7:30", "endTime": "8:10", "subject": "NE"},
      {"startTime": "8:20", "endTime": "9:00", "subject": "NE"},
      {"startTime": "9:10", "endTime": "9:50", "subject":"Az znam che nishto ne znam"},
      {"startTime": "10:10", "endTime": "10:50", "subject": "A golqmo a malko"},
      {"startTime": "11:00", "endTime": "11:40", "subject": "AE"},
      {"startTime": "11:50", "endTime": "12:30", "subject": "AE"},
      {"startTime": "12:40", "endTime": "13:20", "subject": "Chasa na klasnata"}
    ],[
      {"startTime": "7:30", "endTime": "8:10", "subject": "Gospoja klasna"},
      {"startTime": "8:20", "endTime": "9:00", "subject": "Kaka Emi"},
      {"startTime": "9:10", "endTime": "9:50", "subject":"Rusgench"},
      {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
      {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
      {"startTime": "11:50", "endTime": "12:30", "subject": "Meca pak"},
      {"startTime": "12:40", "endTime": "13:20", "subject": "-"}
    ],[
      {"startTime": "7:30", "endTime": "8:10", "subject": "Naskicha"},
      {"startTime": "8:20", "endTime": "9:00", "subject": "Rusgench"},
      {"startTime": "9:10", "endTime": "9:50", "subject":"Gospoja klasna pak"},
      {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
      {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
      {"startTime": "11:50", "endTime": "12:30", "subject": "Matematika"},
      {"startTime": "12:40", "endTime": "13:20", "subject": "Zlatka"}
    ]
  ]

  ngOnInit() {
    if(this.todayDay!=0 && this.todayDay!=6){
      this.currentDay = this.todayDay;
    }else{
      this.currentDay = 1;
    }
    // console.log("curday",this.currentDay);
    // console.log(this.days[this.todayDay]); 
  }

  previousDay(){
    if(this.currentDay==1){
      this.currentDay=5;
    }else{
      this.currentDay--;
    }
    // console.log(this.currentDay);
  }

  nextDay(){
    if(this.currentDay==5){
      this.currentDay=1;
    }else{
      this.currentDay++;
    }
  }

}
