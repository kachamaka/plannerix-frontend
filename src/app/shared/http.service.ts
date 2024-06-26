import { isUndefined } from 'util';
import { SingleSubject, Subject } from './../models/subject.model';
import { Injectable } from '@angular/core';
import { SchoolEvent } from './event.model';
import 'rxjs/add/operator/map' ;
import { HttpClient } from '@angular/common/http';
import { DailyGrades } from './weeklyGrades.model';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Observable, observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Schedule, DailySchedule } from '../models/modifySchedule.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  minDate = new Date();
  maxDate = new Date(new Date().setUTCFullYear(new Date().getUTCFullYear() + 1));
  authToken = {
    "token":""
  };
  currentGroup;
  username = "";
  email = "";
  domain = "https://v3z9qzjgug.execute-api.eu-central-1.amazonaws.com/dev/";


  exampleGroups = [
    // {
    //   group_id: 1,
    //   group_name: "1Nemski izrodi Gruppe 2",
    //   owner: "kachamaka",
    //   group_events: [],
    //   members: []
    // },
    // {
    //   group_id: 2,
    //   group_name: "2Nemski izrodi Gruppe 2",
    //   owner: "Pesho",
    //   group_events: [],
    //   members: []
    // },
    // {
    //   group_id: 3,
    //   group_name: "3Nemski izrodi Gruppe 2",
    //   owner: "Georgi",
    //   group_events: [
    //   ],
    //   members: []
    // },
    // {
    //   group_id: 4,
    //   group_name: "4Nemski izrodi Gruppe 2",
    //   owner: "Ivan",
    //   group_events: [],
    //   members: []
    // },
    // {
    //   group_id: 5,
    //   group_name: "5Nemski izrodi Gruppe 2",
    //   owner: "kachamaka",
    //   group_events: [
    //   ],
    //   members: ["Ivancho", "Pencho", "Stefcho"]
    // },
    // {
    //   group_id: 6,
    //   group_name: "6Nemski izrodi Gruppe 2",
    //   owner: "Aleks",
    //   group_events: [],
    //   members: []
    // },
    // {
    //   group_id: 7,
    //   group_name: "7Nemski izrodi Gruppe 2",
    //   owner: "Ivan",
    //   group_events: [],
    //   members: []
    // },
    // {
    //   group_id: 8,
    //   group_name: "8Nemski izrodi Gruppe 2",
    //   owner: "Ivan",
    //   group_events: [],
    //   members: []
    // },
    // {
    //   group_id: 9,
    //   group_name: "9Nemski izrodi Gruppe 2",
    //   owner: "kachamaka",
    //   group_events: [],
    //   members: []
    // },
  ];


  usernameRegex = new RegExp("^\\w.{3,16}$");
  passwordRegex = new RegExp("^[a-z0-9]{8,35}$");
  emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

  constructor(private http: HttpClient) { }
 
  edit = false;

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
    {"subject":"ФВС","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Информатика","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Информационни технологии","checked":false,"SIP":false,"ZIP":false},
  ];

  nextPeriod;
  weeklyEventsTest = [];
  verbesserungSubjects = [];
  // hours = [7,8,9,10,11,12,13,14,15,16,17,18,19];
  // minutes = ["00","05",];

  allCheckedSubjects = [];
  subjectData = [];

  events: Array<SchoolEvent> = [ ]

  weeklyGrades:Array<DailyGrades> = [];
  

  periods = [{"periods": []},{"periods": []},{"periods": []},{"periods": []},{"periods": []}];

  editMode(){
    this.edit = !this.edit;
  }

  //===========notifications

  registerPush(data:string){
    return this.http.post(this.domain + 'updateSubscription', {token:localStorage.getItem("token"), subscription: data});    
  }

  wellcomeNotificationAndRegister(sub: string) {
    return this.http.post(this.domain + "wellcomeNotification", {token: localStorage.getItem("token"), subscription: sub});
  }


  //=================Groups

  addMember(user: string, groupID: string) {
    console.log("addMember",user, groupID);
    return this.http.post(this.domain + "addMember", {token: localStorage.getItem("token"), member: user, group_id: groupID});
  }
  
  createGroup(data){
    return this.http.post(this.domain + 'createGroup', data); 
  }

  createGroupEvent(data) {
    return this.http.post(this.domain + 'createGroupEvent', data); 
  }

  getGroups(data) {
    return this.http.post(this.domain + 'getGroups', data); 
  }

  getGroupEvents(data) {
    return this.http.post<{success: boolean, message: string, events: SchoolEvent[]}>(this.domain + 'getGroupEvents', data); 
  }
  
  editGroupEvent(data) {
    return this.http.post(this.domain + 'editGroupEvent', data); 
  }

  deleteMember(data) {
    return this.http.post(this.domain + 'deleteMember', data); 
  }

  deleteGroup(data) {
    return this.http.post(this.domain + 'deleteGroup', data); 
  }

  leaveGroup(data) {
    return this.http.post(this.domain + 'leaveGroup', data); 
  }

  deleteGroupEvent(data) {
    return this.http.post(this.domain + 'deleteGroupEvent', data); 
  }

  //=================Subjects
  
  getSubjectsNew(){
    // let mock = of([new Subject("math")]);
    let obj = this.http.post<{message:string, subjects: Subject[]}>(this.domain + 'getSubjects', {token: localStorage.getItem("token")});
    return obj;
  }

  updateSubjects(subjectsForUpdate: Subject[]) {
    return this.http.post(this.domain + 'updateSubjects', {token: localStorage.getItem("token"), subjects: subjectsForUpdate});
  }

  deletSubjects(subjectsIDsForDelete: string[]){
    return this.http.post(this.domain + 'deleteSubjects', {token: localStorage.getItem("token"), subjects: subjectsIDsForDelete});
  }

  createSubjects(subjectsToCreate: Subject[]):Observable<Schedule>{
    return this.http.post<Schedule>(this.domain + 'createSubjects', {token: localStorage.getItem("token"), subjects: subjectsToCreate});
  }

  
  //=================Schdeule

  putSchedule(schedule: Schedule) {
    console.log(schedule,localStorage.getItem("token"));
    return this.http.post(this.domain + "putSchedule", {token: localStorage.getItem("token"), schedule: schedule});
  }

  getNewSchedule() {
    return this.http.post<{success:boolean,message: string, schedule: Schedule}>(this.domain+"getSchedule", {token: localStorage.getItem("token")});
  }

  getDailySchedule() {
    return this.http.post<{success:boolean,message: string, schedule: DailySchedule}>(this.domain+"getDailySchedule", {token: localStorage.getItem("token")});
  }


  //

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
    this.subjectData = [];
    this.allCheckedSubjects = [];
    this.weeklyGrades = [];
    this.events = [];
    this.periods = [{"periods": []},{"periods": []},{"periods": []},{"periods": []},{"periods": []}];
    localStorage.clear();
  }

  isLogged(){
    if(!localStorage.getItem("token")){
      return false;
    }else{
      return true;
    }
  }

  
  sendEmail(email){
    return this.http.post(this.domain + 'sendEmail', email);
  }


  registerUnverifiedUser(user){
    return this.http.post(this.domain + 'registerUnverified', user);
  }
  
  registerUser(data){
    return this.http.post(this.domain + 'register', data);
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

    this.getSubjectsNew().subscribe((data:any)=>{
      console.log("data");
      if(data.success==true){
        this.subjectData = data.subjects;
      }
    })
  }

  loadSchedule(){
    let postData = {
      token: localStorage.getItem("token")
    }

    this.getNewSchedule().subscribe((data:any)=>{
      console.log(data);
      if(data.success==true){
        // console.log(data.s);
        // Object.keys(data.schedule).forEach(key => {
        //   data.schedule[key].allLessons.forEach(period => {
        //     // data.schedule[key].allLessons.start = this.getHourFromMinutes(data.schedule[key].allLessons.start);            
        //     period.end = this.getHourFromMinutes(period.start + period.duration);
        //     period.start = this.getHourFromMinutes(period.start);
        //   });
        // });


        // for(let i = 0; i< Object.keys(data.schedule).length; i++){
        //   Object.keys(data.schedule).forEach(key => {
        //     console.log(key);
        //     console.log(data.schedule[key],"???");
        //     data.schedule[key].allLessons.start = this.getHourFromMinutes(data.schedule[key].allLessons.start);
        //   })
        // }
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
      console.log(data);
        if(data.success==true){
          this.events = [];
          for(let i = 0;i<data.events.length; i++){
            this.events.push(
              new SchoolEvent(
                data.events[i].event_id,
                data.events[i].eventTime*1000,
                data.events[i].subject,
                data.events[i].description,
                data.events[i].subjectType,
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

    
  loadGroupEvents(){
    let postData = {
      token: localStorage.getItem("token"),
      group_id: this.currentGroup.group_id
    }
    this.getGroupEvents(postData).subscribe((data: any)=>{
      console.log(data);
      this.currentGroup.group_events = [];
      for(let i = 0; i<data.events.length; i++){
        this.currentGroup.group_events.push(
          new SchoolEvent(
            data.events[i].event_id, 
            data.events[i].eventTime*1000, 
            data.events[i].subject,
            data.events[i].description,
            data.events[i].subjectType,
            data.events[i].subject_id
          ));
      }
    })
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
  
  getHourFromMinutes(n){
    return `0${n / 60 ^ 0}`.slice(-2) + ':' + ('0' + n % 60).slice(-2);
 }
    
  


}
