import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/http.service';
import { Lesson, DailySchedule } from 'src/app/models/modifySchedule.model';

@Component({
  selector: 'app-next-lesson',
  templateUrl: './next-lesson.component.html',
  styleUrls: ['./next-lesson.component.css']
})
export class NextLessonComponent implements OnInit {
  nextLesson: Lesson;
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.getDailySchedule().subscribe((data)=>{
      console.log(data);
      if(data.success == false) {
        return 
      } 
      let s = new DailySchedule()
      data.schedule = Object.assign(s, data.schedule);
      if (data.schedule.allLessons == null) {
        data.schedule.allLessons = [];
      }
      console.log(data.schedule);
      let nextLesson = data.schedule.getNextLesson();
      this.nextLesson = nextLesson;
    })
  }

}
