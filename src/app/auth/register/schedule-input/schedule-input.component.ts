import { isNull } from 'util';
import { StorageService } from './../../../shared/storage.service';
import { HttpService } from './../../../shared/http.service';
import { SingleSubject } from './../../../models/subject.model';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-schedule-input',
  templateUrl: './schedule-input.component.html',
  styleUrls: ['./schedule-input.component.css']
})
export class ScheduleInputComponent implements OnInit {
  selectedTime;
  lengthOfPeriods;
  test;
  periods = [
  [{"time": "7:30-8:10", "subject": "gospoja Klasna"}],
  [{"time": "7:30-8:10", "subject": "Kaka Emi"}],
  [{"time": "7:30-8:10", "subject": "Kaka Emi"}],
  [{"time": "7:30-8:10", "subject": "Kaka Emi"}],

  [{"time": "7:30-8:10", "subject": "Kaka Emi"},
  {"time": "8:20-9:00", "subject": "Gospoja Frau"},
  {"time": "9:10-9:50", "subject": "Test"}]]
  
  @ViewChild('fullTime') fullTime;

  constructor(public httpService: HttpService,
    public storageService: StorageService) { }

  ngOnInit() {
    if(this.todayDay!=0 && this.todayDay!=6){
      this.currentDay = this.todayDay;
    }else{
      this.currentDay = 1;
    }
  }  
  
  currentDay;
  todayDay = new Date().getDay();
  // today = new Date("2018-11-31T16:00:00");

  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  displayedColumns: string[] = ['startTime', 'endTime', 'subject'];

  checkLog(){
    console.log(this.lengthOfPeriods);
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
  setTime(){
    this.selectedTime = this.fullTime.selectedHour.time+":"+this.fullTime.selectedMinute.time;
    // console.log(this.fullTime);
    console.log(this.selectedTime);
  }

}
