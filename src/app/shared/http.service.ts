import { SingleSubject } from './../models/subject.model';
import { Injectable } from '@angular/core';
import { SchoolEvent } from './event.model';
import 'rxjs/add/operator/map' ;
import { HttpClient } from '@angular/common/http';
import { RequestOptions } from '@angular/http';
import { Headers } from '@angular/http';

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
  // allCheckedSubjects: SingleSubject[] = [
  //   {"subject":"Math","checked":true,"SIP":false,"ZIP":false},
  //   {"subject":"Physic","checked":true,"SIP":false,"ZIP":false},
  //   {"subject":"Bio","checked":true,"SIP":false,"ZIP":false},
  //   {"subject":"Geo","checked":true,"SIP":false,"ZIP":false},
  //   {"subject":"Chem","checked":true,"SIP":false,"ZIP":false}
  // ];

  periods = [{"periods": []},{"periods": []},{"periods": []},{"periods": []},{"periods": []}];
  // periods = [
  //   [
  //     {"startTime": "07:30", "endTime": "8:10", "subject": "Kaka Emi"},
  //     {"startTime": "08:20", "endTime": "9:00", "subject": "Math"},
  //     {"startTime": "09:10", "endTime": "9:50", "subject":"Rusgench"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "FVS"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "-"}
  //   ],[
  //     {"startTime": "07:30", "endTime": "8:10", "subject": "ZIP"},
  //     {"startTime": "08:20", "endTime": "9:00", "subject": "ZIP"},
  //     {"startTime": "09:10", "endTime": "9:50", "subject":"Nasko"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "Zlatitu"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "FVS"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "AE"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "AE"}
  //   ],[
  //     {"startTime": "07:30", "endTime": "8:10", "subject": "NE"},
  //     {"startTime": "08:20", "endTime": "9:00", "subject": "NE"},
  //     {"startTime": "09:10", "endTime": "9:50", "subject":"Az znam che nishto ne znam"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "A golqmo a malko"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "AE"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "AE"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "Chasa na klasnata"}
  //   ],[
  //     {"startTime": "07:30", "endTime": "8:10", "subject": "Gospoja klasna"},
  //     {"startTime": "08:20", "endTime": "9:00", "subject": "Kaka Emi"},
  //     {"startTime": "09:10", "endTime": "9:50", "subject":"Rusgench"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "Meca pak"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "-"}
  //   ],[
  //     {"startTime": "07:30", "endTime": "8:10", "subject": "Naskicha"},
  //     {"startTime": "08:20", "endTime": "9:00", "subject": "Rusgench"},
  //     {"startTime": "09:10", "endTime": "9:50", "subject":"Gospoja klasna pak"},
  //     {"startTime": "10:10", "endTime": "10:50", "subject": "NE"},
  //     {"startTime": "11:00", "endTime": "11:40", "subject": "NE"},
  //     {"startTime": "11:50", "endTime": "12:30", "subject": "Matematika"},
  //     {"startTime": "12:40", "endTime": "13:20", "subject": "Zlatka"}
  //   ]
  // ]

  // upcommingTestDates = [{"date":new Date(2018,11,26),"subject":"History"},
  // {"date":new Date(2018,11, 23),"subject":"NE"},
  // {"date":new Date(2018,11,22),"subject":"NE"},
  // {"date":new Date(2018,11,29),"subject":"Mat"},
  // {"date":new Date(2018,11,19),"subject":"Fizika"},
  // {"date":new Date(2018,11,25),"subject":"Bel"}];
  getEvents() {
    let events: Array<SchoolEvent> = [
      new SchoolEvent(1549752546, "Something", 1),
      new SchoolEvent(1549752546, "Istoriq", 2),
      new SchoolEvent(1549752546, "Filosofiq", 0),
      new SchoolEvent(1549752546, "Math", 3),
      new SchoolEvent(1549752546, "Hello", 1)
    ]
    return events;
  }

  loadToken() {
    this.authToken.token = localStorage.getItem('token');
  }

  createAuthenticationHeaders() {
    this.loadToken();
    this.options = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'authorization': this.authToken
      })
    });
  }
  

  loginUser(user){
    return this.http.post('https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/login', user);
  }

  logoutUser() {
    this.authToken = null;
    localStorage.clear();
  }

  registerUser(user){
    this.http.post('https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/register', user).subscribe((data)=>{
      console.log(data);
    });
  }

  getSchedule(data){
    return this.http.post('https://np777gmeqe.execute-api.eu-central-1.amazonaws.com/dev/getSchedule', data);
  }
  
}
