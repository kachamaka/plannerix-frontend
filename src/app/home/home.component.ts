import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { Grade } from '../shared/grades.model';
import { SchoolEvent } from '../shared/event.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  events = [
    // new SchoolEvent(1549662546, "Философия", "test", 0),
    // new SchoolEvent(1549752546, "Math", "test", 1)
  ];
  nextLesson = "Chem";
  constructor(private httpService: HttpService, private router:Router) { }

  ngOnInit() {
    let postData = {
      token: localStorage.getItem("token")
    }
    this.httpService.getNextPeriod(postData).subscribe((data:any)=>{
      console.log(data.nextPeriod);
      if(data.nextPeriod.subject == ""){
        this.nextLesson = data.message;
      }else{
        this.nextLesson = data.nextPeriod.subject;
      }
    })
    this.httpService.getWeeklyEvents(postData).subscribe((data:any)=>{
      console.log(data);
      console.log("weeklyEvents");
      console.log(data.weeklyEvents);
      for(let i = 0; i<data.weeklyEvents.length; i++){
        this.events.push(
          new SchoolEvent(
              data.weeklyEvents[i].timestamp*1000,
              data.weeklyEvents[i].subject,
              data.weeklyEvents[i].description,
              data.weeklyEvents[i].subjectType
          )
        );
      }
    })
    this.httpService.getSchedule(postData);
    this.httpService.getYearGrades(postData).subscribe(d=>{
      console.log("Data from year grades",d);
    })
    this.httpService.getWeeklyEvents(postData);
  }

  isDesktop() {
    let url= this.router.url;
    let routesToHideNav = ["desktop"];
    for(let i=0; i < routesToHideNav.length; i++) {
      // console.log(i);
      if (url.includes(routesToHideNav[i])){
        // console.log(true)
        return true;
      }
    }
    // console.log(false);
    return false;
    // console.log(url);
  }


}
