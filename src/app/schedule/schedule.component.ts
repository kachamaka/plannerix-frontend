import { isUndefined } from 'util';
import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  currentDay;
  todayDay = new Date().getDay();
  edit = false;
  // today = new Date("2018-11-31T16:00:00");
  backupPeriods = [{"periods": []},{"periods": []},{"periods": []},{"periods": []},{"periods": []}];

  days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  constructor(public httpService: HttpService) { }
  displayedColumns: string[] = ['startTime', 'endTime', 'subject', 'remove'];
  // schedule = [
  //   [
  //   {"startTime": "7:30", "endTime": "8:10", "subject": "Kaka Emi"},
  //   {"startTime": "8:20", "endTime": "9:00", "subject": "Mat"},
  //   {"startTime": "9:10", "endTime": "9:50", "subject":"Rusgench"},
  //   {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
  //   {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
  //   {"startTime": "11:50", "endTime": "12:30", "subject": "FVS"},
  //   {"startTime": "12:40", "endTime": "13:20", "subject": "-"}
  //   ],[
  //     {"startTime": "7:30", "endTime": "8:10", "subject": "ZIP"},
  //     {"startTime": "8:20", "endTime": "9:00", "subject": "ZIP"},
  //     {"startTime": "9:10", "endTime": "9:50", "subject":"Nasko"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "Zlatitu"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "FVS"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "AE"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "AE"}
  //   ],[
  //     {"startTime": "7:30", "endTime": "8:10", "subject": "NE"},
  //     {"startTime": "8:20", "endTime": "9:00", "subject": "NE"},
  //     {"startTime": "9:10", "endTime": "9:50", "subject":"Az znam che nishto ne znam"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "A golqmo a malko"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "AE"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "AE"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "Chasa na klasnata"}
  //   ],[
  //     {"startTime": "7:30", "endTime": "8:10", "subject": "Gospoja klasna"},
  //     {"startTime": "8:20", "endTime": "9:00", "subject": "Kaka Emi"},
  //     {"startTime": "9:10", "endTime": "9:50", "subject":"Rusgench"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "Meca pak"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "-"}
  //   ],[
  //     {"startTime": "7:30", "endTime": "8:10", "subject": "Naskicha"},
  //     {"startTime": "8:20", "endTime": "9:00", "subject": "Rusgench"},
  //     {"startTime": "9:10", "endTime": "9:50", "subject":"Gospoja klasna pak"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "Matematika"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "Zlatka"}
  //   ]
  // ]

  ngOnInit() {
    if(this.todayDay!=0 && this.todayDay!=6){
      this.currentDay = this.todayDay;
    }else{
      this.currentDay = 1;
    }

    let postData = {
      "token": localStorage.getItem("token")
    }

    this.httpService.getSchedule(postData).subscribe((data:any)=>{
      console.log(data);
      if(data.success==true){
        this.httpService.periods = data.schedule;
        console.log(this.httpService.periods);
        // return this.httpService.periods
        // console.log("done");
      }
    })
    // console.log("curday",this.currentDay);
    // console.log(this.days[this.todayDay]); 
  }

  getBackupPeriods(){
    for(let i = 0;i<this.httpService.periods.length;i++){
      this.backupPeriods[i].periods = this.httpService.periods[i].periods.slice(0);
    }
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
  
  getDataSource(){
    if(!isUndefined(this.httpService.periods)){
      let dataSource = new MatTableDataSource(this.httpService.periods[this.currentDay-1].periods);
      return dataSource;
    }
  }

  getScheduleData(){
    let postData = {
      "token": localStorage.getItem("token")
    }
    this.httpService.getSchedule(postData).subscribe((data:any)=>{
      console.log(data);
      if(data.success==true){
        this.httpService.periods = data.schedule;
        return this.httpService.periods
        // console.log("done");
      }
    })
  }

  editMenu(){
    this.edit = !this.edit;
    // console.log(this.httpService.periods[4].periods);
    this.getBackupPeriods();
    console.log(this.backupPeriods);
  }

  removePeriod(i){
    this.httpService.periods[this.currentDay-1].periods.splice(i, 1);
    console.log(this.backupPeriods[this.currentDay-1]);
  }
  addPeriod(){
    this.httpService.periods[this.currentDay-1].periods.push({"startTime": "", "endTime":"", "subject": "---"});
  }

  saveEdit(){
    this.editMenu();
  }

  cancelEdit(){
    for(let i = 0;i<this.httpService.periods.length;i++){
      this.httpService.periods[i].periods = this.backupPeriods[i].periods.slice(0);
    }
    this.editMenu();
  }

  sortPeriods(day){
    this.httpService.periods[day].periods.sort((a, b) => {
      console.log(this.getMinutes(a.startTime),this.getMinutes(b.startTime));      
      return this.getMinutes(a.startTime) - this.getMinutes(b.startTime);
    });
  }

  getMinutes(time:string){
    let minutesArray = time.split(":");
    if(minutesArray[0][0]=="0"){
      return parseInt(minutesArray[0][1])*60 + parseInt(minutesArray[1]);
    }else{
      return parseInt(minutesArray[0])*60 + parseInt(minutesArray[1]);
    }
  }

}
