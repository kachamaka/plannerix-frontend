import { StorageService } from './../../../shared/storage.service';
import { HttpService } from './../../../shared/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-schedule-input',
  templateUrl: './schedule-input.component.html',
  styleUrls: ['./schedule-input.component.css']
})
export class ScheduleInputComponent implements OnInit {
  selectedTime;
  lengthOfPeriods;
  test;
  // periods = [[],[],[],[],[]];
  
  @ViewChild('startTime') startTime;
  @ViewChild('endTime') endTime;
  
  constructor(public httpService: HttpService,
    public storageService: StorageService) { }

  ngOnInit() {
    if(this.today!=0 && this.today!=6){
      this.currentDay = this.today;
    }else{
      this.currentDay = 1;
    }
  }  
  
  currentDay;
  today = new Date().getDay();
  // today = new Date("2018-11-31T16:00:00");
  dataSource = new MatTableDataSource(this.httpService.periods);

  days = ["Неделя","Понеделник","Вторник","Сряда","Четвъртък","Петък","Събота"];

  displayedColumns: string[] = ['startTime', 'endTime', 'subject', 'remove'];

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

  testLog(){
    console.log(this.httpService.periods);
  }
  addPeriod(){
    this.httpService.periods[this.currentDay-1].periods.push({"startTime": "", "endTime":"", "subject": "---"});
  }
  removePeriod(i){
    this.httpService.periods[this.currentDay-1].periods.splice(i, 1);
  }
  getDataSource(){
    let dataSource = new MatTableDataSource(this.httpService.periods[this.currentDay-1].periods);
    return dataSource;
  }

}
