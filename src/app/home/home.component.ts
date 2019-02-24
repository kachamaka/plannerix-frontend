import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { Grade } from '../shared/grades.model';
import { SchoolEvent } from '../shared/event.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  grades: Array<Grade> = [
    {subject: "Math", grades: [5,6,6]},
    {subject: "Bg", grades: [4,5,5]}
  ]

  events = [
    // new SchoolEvent(1549662546, "Философия", "test", 0),
    // new SchoolEvent(1549752546, "Math", "test", 1)
  ];
  nextLesson = "Chem";
  constructor(private httpService: HttpService) { }

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
  }


}
