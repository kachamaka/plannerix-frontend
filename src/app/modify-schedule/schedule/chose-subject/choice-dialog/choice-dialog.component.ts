import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subject } from 'src/app/models/subject.model';
import { Store, Select } from '@ngxs/store';
import { AddLessonToDailySchedule } from 'src/app/actions/modifySchedule.action';
import { Lesson, DailySchedule } from 'src/app/models/modifySchedule.model';
import { TimeConverter } from 'src/app/models/timeConverter.model';
import { ModifyScheduleState } from 'src/app/states/modifySchedule.state';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-choice-dialog',
  templateUrl: './choice-dialog.component.html',
  styleUrls: ['./choice-dialog.component.css']
})
export class ChoiceDialogComponent implements OnInit {
  @ViewChild("hours") hours: ElementRef<HTMLInputElement>;
  @ViewChild("minutes") minutes: ElementRef<HTMLInputElement>;
  @ViewChild("duration") duration: ElementRef<HTMLInputElement>;
  @Select(ModifyScheduleState.getChosenSchedule) schedule: Observable<DailySchedule>;
  // dailySchedule: DailySchedule;

  hoursControl:FormControl;
  minutesControl: FormControl;
  duartionControl: FormControl;

  tc = new TimeConverter();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {subject: Subject},
    public dialogRef: MatDialogRef<ChoiceDialogComponent>,
    private store: Store
  ) { }

  ngOnInit() {
    this.schedule.subscribe(s=>{
      let hours = '';
      let minutes = '';
      if (s.allLessons.length!=0) {
        let time = this.tc.convertMinutesToString(s.getLastLessonEnd())
        let t = time.split(":")
        hours = t[0];
        minutes = t[1];
      }
      this.hoursControl = new FormControl(hours, [Validators.required, Validators.min(0), Validators.max(23)]);
      this.minutesControl = new FormControl(minutes, [Validators.required, Validators.min(0), Validators.max(59)]);
      this.duartionControl = new FormControl('', [Validators.required, this.duartionValidator.bind(this)]);
      // console.log(hours, minutes);
    })
  }

  addSubjectAndClose() {
    if(this.hoursControl.invalid || this.minutesControl.invalid || this.duartionControl.invalid) {
      return;
    } 
    let start = this.getTimeFromForm();
    let duration = this.getDurationFromForm();
    this.store.dispatch(new AddLessonToDailySchedule(new Lesson(start, duration, this.data.subject, this.data.subject.id)));
    this.dialogRef.close();
  }

  duartionValidator(control: FormControl) {
    let value = control.value;
    let end = this.getTimeFromForm() + parseInt(value);
    if(end>1440) { // minutes in a day;
      return {'over24h':true}
    }
    return null
  }
  getTimeFromForm():number {
    let hoursString = this.hours.nativeElement.value;
    let minutesString = this.minutes.nativeElement.value;
    let start = this.tc.convertStringtoMinutes(hoursString+":"+minutesString);
    return start
  }
  getDurationFromForm():number{
    let durationString = this.duration.nativeElement.value;
    let duration = parseInt(durationString);
    return duration;
  }

  getHoursError() {
    let errors = this.hoursControl.errors;
    if (errors.max) {
      return "max" // over max
    }
    if (errors.min) {
      return "min" // under min
    }
    if (errors.required) {
      return "required"
    }
    return ""
  }
  getMinutesErrors() {
    let errors = this.minutesControl.errors;
    if (errors.max) {
      return "max" // over max
    }
    if (errors.min) {
      return "min" // under min
    }
    if (errors.required) {
      return "required"
    }
    return ""
  }

  getDurationErrors() {
    let errors = this.duartionControl.errors;
    if (errors.required) {
      return "required";
    }
    if  (errors.over24h) {
      return "this is over 24 h";
    }
    return "";
  }
}
