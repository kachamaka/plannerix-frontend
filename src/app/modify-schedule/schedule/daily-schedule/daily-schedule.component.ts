import { Component, OnInit, Input } from '@angular/core';
import { DailySchedule, Lesson, MONDAY, Schedule } from 'src/app/models/modifySchedule.model';
import { Subject } from 'src/app/models/subject.model';
import { Store, Select } from '@ngxs/store';
import { AddLessonToDailySchedule } from 'src/app/actions/modifySchedule.action';
import { ModifyScheduleState } from 'src/app/states/modifySchedule.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.css']
})
export class DailyScheduleComponent implements OnInit {
  @Select(ModifyScheduleState.getChosenSchedule) schedule:Observable<DailySchedule>;
  lessons = [] ;
  constructor(private store: Store) { }

  ngOnInit() {
    this.schedule.subscribe(v=>{
      this.lessons = v.getLessons();
    })
  }

}
