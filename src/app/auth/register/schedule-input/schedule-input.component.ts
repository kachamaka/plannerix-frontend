import { isNull } from 'util';
import { StorageService } from './../../../shared/storage.service';
import { HttpService } from './../../../shared/http.service';
import { SingleSubject } from './../../../models/subject.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule-input',
  templateUrl: './schedule-input.component.html',
  styleUrls: ['./schedule-input.component.css']
})
export class ScheduleInputComponent implements OnInit {

  constructor(private httpService: HttpService,
    private storageService: StorageService) { }

  ngOnInit() {
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

}
