import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { MatStepper } from '@angular/material';
import { AllModifiedSubjectsServer } from '../actions/modifySchedule.action';
import { Store, Select } from '@ngxs/store';
import { ModifyScheduleState } from '../states/modifySchedule.state';
import { Observable } from 'rxjs';
import { Schedule } from '../models/modifySchedule.model';

@Component({
  selector: 'app-modify-schedule',
  templateUrl: './modify-schedule.component.html',
  styleUrls: ['./modify-schedule.component.css']
})
export class ModifyScheduleComponent implements OnInit {
  @ViewChild("stepper") stepper: MatStepper;
  constructor( private httpService: HttpService, private store: Store) { }
  @Select(ModifyScheduleState.getSchedule) schedule:Observable<Schedule>

  ngOnInit() {
    // console.log(this.stepper);
    this.schedule.subscribe(r=>{
      setTimeout(()=>{

        console.log(r);
        console.log(JSON.stringify(r));
      }, 2000);
    })
  }
  selectionChange(event) {
    if (event.previouslySelectedIndex == 0 && event.selectedIndex == 1) {
      this.store.dispatch(new AllModifiedSubjectsServer);
    }
  }
}
