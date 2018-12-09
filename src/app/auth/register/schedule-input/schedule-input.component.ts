import { isNull } from 'util';
import { StorageService } from './../../../shared/storage.service';
import { HttpService } from './../../../shared/http.service';
import { SingleSubject } from './../../../models/subject.model';
import { Component, OnInit } from '@angular/core';
import { AmazingTimePickerService } from 'amazing-time-picker';

@Component({
  selector: 'app-schedule-input',
  templateUrl: './schedule-input.component.html',
  styleUrls: ['./schedule-input.component.css']
})
export class ScheduleInputComponent implements OnInit {
  selectedTime;
  lengthOfPeriods;
  periods = [[{"time": "7:30-8:10", "subject": "Kaka Emi"}],
  [{"time": "7:30-8:10", "subject": "gospoja Klasna"}],
  [{"time": "7:30-8:10", "subject": "Kaka Emi"}],
  [{"time": "7:30-8:10", "subject": "Kaka Emi"}],
  [{"time": "7:30-8:10", "subject": "Kaka Emi"}]]
  
  constructor(private atp: AmazingTimePickerService,
    public httpService: HttpService,
    public storageService: StorageService) { }

  ngOnInit() {
    if(this.todayDay!=0 && this.todayDay!=6){
      this.currentDay = this.todayDay;
    }else{
      this.currentDay = 1;
    }
  }
  
  log(){
    let checkedSubjects: SingleSubject[] = [];
    this.httpService.subjects.forEach(subject => {
      if(subject.checked == true || subject.SIP == true || subject.ZIP == true){
        checkedSubjects.push(subject);
      }
    });
    let registerCredentials = {
      "username": localStorage.getItem("username"),
      "firstname":localStorage.getItem("firstname"),
      "password": localStorage.getItem("password")
    }
    console.log("credentials", registerCredentials);
    // console.log("subjects",this.httpService.subjects);
    console.log("checked subs",checkedSubjects);
    console.log("additional subs",this.httpService.additionalSubjects);
  }

  checkRegisterValidation(){
    let checkedSubs = false;
    for(let i = 0; i< this.httpService.subjects.length; i++){
      if(this.httpService.subjects[i].checked == true ||
        this.httpService.subjects[i].SIP == true || 
        this.httpService.subjects[i].ZIP == true){
        checkedSubs = true;
        break;
      }
    }

    if(
    !isNull(localStorage.getItem("username")) &&
    !isNull(localStorage.getItem("firstname")) &&
    !isNull(localStorage.getItem("password")) &&
    localStorage.getItem("username")!=""&&
    localStorage.getItem("firstname")!="" &&
    localStorage.getItem("password")!="" &&
    checkedSubs == true){
      return false;
    }else{
      return true;
    }
  }
  
  
  currentDay;
  todayDay = new Date().getDay();
  // today = new Date("2018-11-31T16:00:00");

  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  displayedColumns: string[] = ['time','subject'];

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


  open() {
    const amazingTimePicker = this.atp.open({
      theme: "material-blue",
      animation: "fade",
      changeToMinutes: true
    });
    amazingTimePicker.afterClose().subscribe(time => {
        this.selectedTime = time;
    });
}

}
