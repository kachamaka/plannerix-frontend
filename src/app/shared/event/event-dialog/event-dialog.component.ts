import { Component, OnInit, Input, Inject, ViewChild, ElementRef } from '@angular/core';
import { SchoolEvent } from 'src/app/shared/event.model';
import { MAT_DIALOG_DATA, MatDialogRef, MatDatepicker } from '@angular/material';
import { DateTimeService } from 'src/app/shared/date-time.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-event-dialog',
  templateUrl: './event-dialog.component.html',
  styleUrls: ['./event-dialog.component.css']
})
export class EventDialogComponent implements OnInit {
  
  minDate = new Date();
  date:Date;
  edit: boolean = false;
  current_event = new FormGroup({
    subject : new FormControl(''),
    date: new FormControl(),
    type: new FormControl(''),
    description: new FormControl('')
  });
  event: SchoolEvent;
  fallback;
  @ViewChild('picker') picker: MatDatepicker<null>;
  constructor(public dialogRef: MatDialogRef<EventDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any, private dateTimeS: DateTimeService) { }

  ngOnInit() {
    if(this.data.new) {
      this.newEvent();
      return
    }
    this.event = this.data.event;
    this.date = this.event.getDate();
    this.current_event.setValue({
      subject: this.event.subject,
      type: this.event.type.toString(),
      date: this.date,
      description : "place holder"
    })
    this.current_event.controls['date'].disable();
    this.current_event.controls['type'].disable();
    this.current_event.controls['description'].disable();
    this.current_event.controls['subject'].disable();
 
  }
  openDatePicker() {
    if(this.data.new) {
      if(window.innerWidth < 450) {
        this.picker.touchUi = true;
      }
      this.picker.open();
      return
    }
  }
  closeDatePicker() {
    let date:Date = this.picker._selected;
    // console.log(date.getTime()/1000)
  }


  newEvent() {
    this.edit = true;
    this.current_event.controls['date'].disable();
  }

  startEdit() {
    this.edit = true;
    this.fallback = this.current_event.value;
    this.current_event.controls['type'].enable();
    this.current_event.controls['description'].enable();
    this.current_event.controls['subject'].enable();
  }
  isInEditMode() {
    return this.edit;
  }
  
  cancelEditMode() {
    if(this.data.new) {
      this.dialogRef.close(null);
      return
    }
    this.edit = false;
    this.current_event.controls['type'].disable();
    this.current_event.controls['description'].disable();
    this.current_event.controls['subject'].disable();
    this.current_event.setValue(this.fallback);
  }

  acceptEdit() {
    if(this.data.new ) {
      if (!this.current_event.valid || !this.current_event.controls['date'].value) {
        return
      }
      let out:SchoolEvent =new SchoolEvent(
        this.current_event.controls['date'].value.getTime()/1000, 
        this.current_event.controls['subject'].value,
        this.current_event.controls['description'].value,
        parseInt(this.current_event.controls['type'].value)
      )
      this.dialogRef.close(out);
      return
    }
    this.edit = false;
    this.current_event.controls['type'].disable();
    this.current_event.controls['description'].disable();
    this.current_event.controls['subject'].disable();
    //send to server and refresh
  }
}
