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
  displayedColumns: string[] = ['time','subject'];
  schedule = [[
    {"time": "7:30-8:10", "subject": "Kaka Emi"},
    {"time": "8:20-9:00", "subject": "Mat"},
    {"time": "9:10-9:50", "subject":"Rusgench"},
    {"time": "9:50-10:10", "subject": "Golqmo"},
    {"time": "10:10-10:50", "subject": "NE"},
    {"time": "11:00-11:40", "subject": "NE"},
    {"time": "11:50-12:30", "subject": "FVS"},
    {"time": "12:40-13:30", "subject": "-"}
    ],[
      {"time": "7:30-8:10", "subject": "ZIP"},
      {"time": "8:20-9:00", "subject": "ZIP"},
      {"time": "9:10-9:50", "subject":"Nasko"},
      {"time": "9:50-10:10", "subject": "Golqmo"},
      {"time": "10:10-10:50", "subject": "Zlatitu"},
      {"time": "11:00-11:40", "subject": "FVS"},
      {"time": "11:50-12:30", "subject": "AE"},
      {"time": "12:40-13:30", "subject": "AE"}
    ],[
      {"time": "7:30-8:10", "subject": "NE"},
      {"time": "8:20-9:00", "subject": "NE"},
      {"time": "9:10-9:50", "subject":"Az znam che nishto ne znam"},
      {"time": "9:50-10:10", "subject": "Golqmo"},
      {"time": "10:10-10:50", "subject": "A golqmo a malko"},
      {"time": "11:00-11:40", "subject": "AE"},
      {"time": "11:50-12:30", "subject": "AE"},
      {"time": "12:40-13:30", "subject": "Chasa na klasnata"}
    ],[
      {"time": "7:30-8:10", "subject": "Gospoja klasna"},
      {"time": "8:20-9:00", "subject": "Kaka Emi"},
      {"time": "9:10-9:50", "subject":"Rusgench"},
      {"time": "9:50-10:10", "subject": "Golqmo"},
      {"time": "10:10-10:50", "subject": "NE"},
      {"time": "11:00-11:40", "subject": "NE"},
      {"time": "11:50-12:30", "subject": "Meca pak"},
      {"time": "12:40-13:30", "subject": "-"}
    ],[
      {"time": "7:30-8:10", "subject": "Naskicha"},
      {"time": "8:20-9:00", "subject": "Rusgench"},
      {"time": "9:10-9:50", "subject":"Gospoja klasna pak"},
      {"time": "9:50-10:10", "subject": "Golqmo"},
      {"time": "10:10-10:50", "subject": "NE"},
      {"time": "11:00-11:40", "subject": "NE"},
      {"time": "11:50-12:30", "subject": "Matematika"},
      {"time": "12:40-13:30", "subject": "Zlatka"}
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
