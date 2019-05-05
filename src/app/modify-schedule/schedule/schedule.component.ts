import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ModifyScheduleState } from 'src/app/states/modifySchedule.state';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/subject.model';
import { Schedule } from 'src/app/models/modifySchedule.model';
import { UpdateSchdeule } from 'src/app/actions/modifySchedule.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  @Select(ModifyScheduleState.getChosenSchedule) schedule: Observable<Schedule>;
  @Select(ModifyScheduleState.getSubjects) subjects:Observable<Subject>;
  constructor(private store: Store, private router: Router) { }

  ngOnInit() {
  }

  onDone(){
    this.store.dispatch(new UpdateSchdeule());
    // this.router.navigate(["modify-schedule"]);
  }
}
