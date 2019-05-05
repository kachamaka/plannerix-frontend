import { Component, OnInit, Input } from '@angular/core';
import { Lesson } from 'src/app/models/modifySchedule.model';
import { Store } from '@ngxs/store';
import { DeleteLessonFromDailySchedule } from 'src/app/actions/modifySchedule.action';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  @Input("lesson") lesson: Lesson;
  constructor(private store: Store) { }

  ngOnInit() {
    
  }
  deleteLesson() {
    this.store.dispatch(new DeleteLessonFromDailySchedule(this.lesson));
  }
}
