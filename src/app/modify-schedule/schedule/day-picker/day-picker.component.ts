import { Component, OnInit } from '@angular/core';
import { AllDays } from 'src/app/models/modifySchedule.model';
import { Select, Store } from '@ngxs/store';
import { ModifyScheduleState } from 'src/app/states/modifySchedule.state';
import { Observable } from 'rxjs';
import { UpdateChosenDay } from 'src/app/actions/modifySchedule.action';

@Component({
  selector: 'app-day-picker',
  templateUrl: './day-picker.component.html',
  styleUrls: ['./day-picker.component.css']
})
export class DayPickerComponent implements OnInit {
  days = AllDays;
  @Select(ModifyScheduleState.getSelectedDay) day:Observable<Number>;
  constructor(private store: Store) { }

  ngOnInit() {
  }
  indexChanged(event) {
    this.store.dispatch(new UpdateChosenDay(event))
  }
} 


