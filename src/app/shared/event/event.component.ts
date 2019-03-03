import { CalendarComponent } from './../../calendar/calendar.component';
import { Component, OnInit, Input } from '@angular/core';
import {SchoolEvent} from '../../shared/event.model';
import { DateTimeService } from 'src/app/shared/date-time.service';
import { MatDialog } from '@angular/material';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input('events') events: Array<SchoolEvent>;
  @Input('editable') editable:boolean;
  constructor(
    private httpService: HttpService,
     public dateTimeS: DateTimeService,
      public dialog: MatDialog,
      // private calComp: CalendarComponent
      ) { }
  date:string;
  ngOnInit() {
    // this.openModal(this.events[0]);
  }
  openModal(event: SchoolEvent) {
    let dialogRef = this.dialog.open(EventDialogComponent, {
      data: {
        event: event,
        editable: this.editable,
        new: false
      }
    })
    dialogRef.afterClosed().subscribe((out)=>{
      if(!out) {
        console.log("canceled");
      }
      if(out) {
        if(out.action){
          let postData = {
            token: localStorage.getItem("token"),
            timestamp: out.timestamp
          }
          // console.log(out, postData);
          // return
          this.httpService.deleteEvent(postData).subscribe((data:any)=>{
            console.log(data);
            this.httpService.loadEvents();
          })

        }else{
          if(this.editable == true){
            let postData = {
              token: localStorage.getItem("token"),
              timestamp: out.date,
              subject: out.subject,
              description: out.description,
              subjectType: out.type
            } 
            
            this.httpService.editEvent(postData).subscribe((data:any)=>{
              if(data.success==true){
                console.log(data);
                // this.calComp.getEvents();
                this.httpService.loadEvents();
              }
            })
          }
        }
      }
    });
  }

}
