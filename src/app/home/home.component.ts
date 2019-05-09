import { NotificationsService } from './../shared/setup/notifications.service';
import { StorageService } from './../shared/storage.service';
import { HttpService } from './../shared/http.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { SchoolEvent } from '../shared/event.model';
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
  lessonTime;
  constructor(
    private notificationsService: NotificationsService,
    public storageService: StorageService,
    private httpService: HttpService,
    private router:Router) { }

  ngOnInit() {
    let postData = {
      token: localStorage.getItem("token")
    }

    // this.httpService.events.push(new SchoolEvent(1557753770000, "Биология", "Контролно", 0));    

    // this.httpService.getWeeklyEvents(postData).subscribe((data:any)=>{
    // this.httpService.getSchedule(postData).subscribe((data:any)=>{
    //   console.log(data);
    // })
    // this.httpService.events.push(new SchoolEvent(1557753770000, "Биология", "Контролно", 0));    
    // this.httpService.getNextPeriod(postData).subscribe((data:any)=>{
    //   // console.log(data.nextPeriod);
    //   if(data.nextPeriod.subject == ""){
    //     this.nextLesson = data.message;
    //   }else{
    //     this.nextLesson = data.nextPeriod.subject;
    //     this.httpService.nextPeriod = data.nextPeriod; //test
    //     this.lessonTime = data.nextPeriod.startTime;
    //   }
    // })
    this.httpService.getWeeklyEvents(postData).subscribe((data:any)=>{
      console.log(data,"da");
      // console.log("weeklyEvents");
      // console.log(data.weeklyEvents);
      this.httpService.weeklyEventsTest = [];
      for(let i = 0; i<data.weeklyEvents.length; i++){
        this.events.push(
          new SchoolEvent(
              0,
              data.weeklyEvents[i].eventTime*1000,
              data.weeklyEvents[i].subject,
              data.weeklyEvents[i].description,
              data.weeklyEvents[i].subjectType
          )
        );
        //test to be removed
        this.httpService.weeklyEventsTest.push(
          new SchoolEvent(
              0,
              data.weeklyEvents[i].eventTime*1000,
              data.weeklyEvents[i].subject,
              data.weeklyEvents[i].description,
              data.weeklyEvents[i].subjectType
          )
        )
        //
      }
      // this.httpService.weeklyEventsTest.push(new SchoolEvent(1557705600000, "Биология", "Контролно", 0));
    })
    this.onResize();
    // this.httpService.getSchedule(postData);
    this.httpService.getYearGrades(postData).subscribe((d:any)=>{
      // console.log("Data from year grades",d);
      //remove
      let grades = d.grades;
      let yearGrades = {};
      for(let i = 0; i<grades.length; i++){
        if(Object.keys(yearGrades).includes(grades[i].subject)){
          yearGrades[grades[i].subject].push(grades[i].value);
        }else{
          yearGrades[grades[i].subject] = [grades[i].value];
        }
      }
      let averageScore = {};
      for (let sub in yearGrades){
        let subScore = 0;
        for(let j = 0; j<yearGrades[sub].length; j++){
          subScore += yearGrades[sub][j];
        }
        averageScore[sub] = subScore/yearGrades[sub].length;
      }      
      this.httpService.verbesserungSubjects = [];
      for (let sub in averageScore){
        if(averageScore[sub]<4.5){
          this.httpService.verbesserungSubjects.push(sub);
        }
      }
      //remove
    })
    this.httpService.getWeeklyEvents(postData);
    Notification.requestPermission().then((perm)=>{
      console.log(`Notification permission: ${perm}`);
    })

  }

 

  onResize() {
    // window.addEventListener("resize",)
    let url= this.router.url;
    if (window.innerWidth < 800) {
      if (url.includes("desktop")) {
        this.router.navigate(["/home"]);
      }
    } else {
      if (!url.includes("desktop")) {
        this.router.navigate(["/desktop"]);
      }
    }
  }


}
