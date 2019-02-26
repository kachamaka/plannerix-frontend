import { SingleSubject } from './../models/subject.model';
import { Injectable } from '@angular/core';
import { SchoolEvent } from './event.model';
import 'rxjs/add/operator/map' ;
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }
 

  additionalSubjects: SingleSubject[] = [];
  
  subjects: SingleSubject[] = [
    {"subject":"Math","checked":false,"SIP":false,"ZIP":false},
    {"subject":"English","checked":false,"SIP":false,"ZIP":false},
    {"subject":"BG","checked":false,"SIP":false,"ZIP":false},
    {"subject":"German","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Geo","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Bio","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Chemistry","checked":false,"SIP":false,"ZIP":false},
    {"subject":"Physic","checked":false,"SIP":false,"ZIP":false}
  ];

  allCheckedSubjects = [];
  subjectData = [];

  events: Array<SchoolEvent> = [ ]

  

  periods = [{"periods": []},{"periods": []},{"periods": []},{"periods": []},{"periods": []}];

  getEvents(data) {
    return this.http.post(this.domain + 'getAllEvents', data); 
  }

  getWeeklyEvents(data) {
    console.log(data);
    return this.http.post('https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getWeeklyEvents', data); 
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

  logoutUser() {
    this.authToken = null;
    localStorage.clear();
  }

  registerUser(user){
    this.http.post(this.domain + 'register', user).subscribe((data)=>{
      console.log(data);
    });
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

  loadSchedule(){
    let postData = {
      "token": localStorage.getItem("token")
    }

    this.getSchedule(postData).subscribe((data:any)=>{
      console.log(data);
      if(data.success==true){
        this.periods = data.schedule;
        console.log(this.periods);
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
  
}
