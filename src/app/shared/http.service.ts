import { isUndefined } from 'util';
import { SingleSubject } from './../models/subject.model';
import { Injectable } from '@angular/core';
import { SchoolEvent } from './event.model';
import 'rxjs/add/operator/map' ;
import { HttpClient } from '@angular/common/http';
import { DailyGrades } from './weeklyGrades.model';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  minDate = new Date();
  maxDate = new Date(new Date().setUTCFullYear(new Date().getUTCFullYear() + 1));
  authToken = {
    "token":""
  };
  options;
  domain = "https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/";
  usernameRegex = new RegExp("^\\w.{3,16}$");
  passwordRegex = new RegExp("^[a-z0-9]{8,35}$");
  emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(private http: HttpClient) { }
 

  additionalSubjects: SingleSubject[] = [];
  
  subjects: SingleSubject[] = [
    {"subject":"Математика","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Английски","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Български","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Немски","checked":false,"SIP":false,"ZIP":false},
    {"subject":"География","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Биология","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Химия","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Физика","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Философия","checked":false,"SIP":false,"ZIP":false},
    {"subject":"История","checked":false,"SIP":false,"ZIP":false},
    {"subject":"ФВС","checked":false,"SIP":false,"ZIP":false}
  ];

  allCheckedSubjects = [];
  subjectData = [];

  events: Array<SchoolEvent> = [ ]

  weeklyGrades:Array<DailyGrades> = [];
  

  periods = [{"periods": []},{"periods": []},{"periods": []},{"periods": []},{"periods": []}];

  getJoke() {
    return this.http.get("https://api.chucknorris.io/jokes/random");
  }

  getEvents(data) {
    return this.http.post(this.domain + 'getAllEvents', data); 
  }

  getWeeklyEvents(data) {
    // console.log(data);
    return this.http.post(this.domain + 'getWeeklyEvents', data); 
  }

  createEvent(data) {
    return this.http.post(this.domain + 'createEvent', data); 
  }
  
  editEvent(data) {
    return this.http.post(this.domain + 'editEvent', data); 
  }

  deleteEvent(data) {
    return this.http.post(this.domain + 'deleteEvent', data); 
  }  

  loadToken() {
    this.authToken.token = localStorage.getItem('token');
  }

  loginUser(user){
    return this.http.post(this.domain + 'login', user);
  }

  getProfile(data){
    return this.http.post(this.domain + 'getProfile', data);
  }

  updateNotifications(data){
    return this.http.post(this.domain + 'updateNotifications', data);
  }

  changePassword(data){
    return this.http.post(this.domain + 'changePassword', data);
  }

  changeEmail(data){
    return this.http.post(this.domain + 'changeEmail', data);
  }

  logoutUser() {
    this.authToken = null;
    localStorage.clear();
  }

  isLogged(){
    if(!localStorage.getItem("token")){
      return false;
    }else{
      return true;
    }
  }

  registerUser(user){
    return this.http.post(this.domain + 'register', user);
  }

  getSchedule(data){
    return this.http.post(this.domain + 'getSchedule', data);
  }
  
  updateSchedule(data){
    return this.http.post(this.domain + 'updateSchedule', data);
  }

  getSubjects(data){
    return this.http.post(this.domain + 'getSubjects', data);
  }

  getNextPeriod(data){
    return this.http.post(this.domain + 'getNextPeriod', data);
  }

  getWeeklyGrades(data){
    return this.http.post(this.domain + 'getWeeklyGrades', data);
  }

  getYearGrades(data){
    return this.http.post(this.domain + 'getYearGrades', data);
  }

  getAllGrades(data){
    return this.http.post(this.domain + 'getAllGrades', data);
  }

  inputGrade(data){
    return this.http.post(this.domain + 'inputGrade', data);
  }

  loadSubjects(){
    let postData = {
      token: localStorage.getItem("token")
    }

    this.getSubjects(postData).subscribe((data:any)=>{
      if(data.success==true){
        this.subjectData = data.subjects;
      }
    })
  }

  loadSchedule(){
    let postData = {
      token: localStorage.getItem("token")
    }

    this.getSchedule(postData).subscribe((data:any)=>{
      // console.log(data);
      if(data.success==true){
        this.periods = data.schedule;
        // console.log(this.periods);
      }
    })
  }


  loadEvents(){
    let postData = {
      "token": localStorage.getItem("token")
    }

    this.getEvents(postData).subscribe((data:any)=>{
      // console.log(data);
        if(data.success==true){
          this.events = [];
          for(let i = 0;i<data.events.length; i++){
            this.events.push(
              new SchoolEvent(
                data.events[i].timestamp*1000,
                data.events[i].subject,
                data.events[i].description,
                data.events[i].subjectType
                )
              );
            }
          }
        }
      )
    }

    loadWeeklyGrades(){
      let d = new Date();
      let day = d.getDay();
      let diff = d.getDate() - day + (day == 0 ? -6 : 1);
      let thisWeekMonday = new Date((d.setDate(diff))).getTime();
      this.weeklyGrades = [];
      for(let i = 0; i<5;i++){
        // console.log(new Date(thisWeekMonday + i*86400000).toLocaleDateString('bg-BG'));
        let gradesDate = this.getDateFormat(new Date(thisWeekMonday + i*86400000).toLocaleDateString('bg-BG'));
        // console.log("gradesDate", gradesDate);
        let newWeeklyGrade = {
          date: gradesDate,
          grades: []
        }
        this.weeklyGrades.push(newWeeklyGrade);
      }
      let postData = {
        token: localStorage.getItem("token")
      }
      this.getWeeklyGrades(postData).subscribe((data:any)=>{
        // console.log(data);
        for(let k = 0; k<data.weeklyGrades.length; k++){
          let gradeRawDate = new Date(data.weeklyGrades[k].timestamp*1000).toLocaleDateString('bg-BG');
          let gradeDate = this.getDateFormat(gradeRawDate);
          // console.log(gradeDate);
          for(let j = 0; j<this.weeklyGrades.length; j++){
            if(gradeDate == this.weeklyGrades[j].date){
              let exists = false;
              for(let l = 0; l<this.weeklyGrades[j].grades.length; l++){
                if(data.weeklyGrades[k].subject==this.weeklyGrades[j].grades[l].subject){
                  exists = true;
                  break;
                }
              }
              if(exists == false){
                this.weeklyGrades[j].grades.push({subject: data.weeklyGrades[k].subject, grades: []})              
                //not very sure if for or not
                this.weeklyGrades[j].grades[this.weeklyGrades[j].grades.length-1].grades.push(data.weeklyGrades[k].value);
                break;
              }else {
                for(let m = 0; m<this.weeklyGrades[j].grades.length; m++){
                  if(this.weeklyGrades[j].grades[m].subject == data.weeklyGrades[k].subject){
                    this.weeklyGrades[j].grades[this.weeklyGrades[j].grades.length-1].grades.push(data.weeklyGrades[k].value);
                    break;
                  }
                }
              }
            }
          }
        }
      });
    }

  getDateFormat(initDate: string){
    // console.log(initDate);
    let date = initDate.replace(/\./g, "/");
    let dateField = date.split("/");
    // console.log("dateField",dateField);
    if(dateField[0].length == 1){
      dateField[0] = "0" + dateField[0];
    }
    if(dateField[1].length == 1 ){
      dateField[1] = "0" + dateField[1];
    }
    let dateData = dateField[0]+"."+dateField[1]+"."+dateField[2];
    // console.log("dateData", dateData);
    return dateData
  }
    
  
}
