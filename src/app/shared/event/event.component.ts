import { Component, OnInit, Input } from '@angular/core';
import {SchoolEvent} from '../../shared/event.model';
import { DateTimeService } from 'src/app/shared/date-time.service';
import { MatDialog } from '@angular/material';
import { EventDialogComponent } from './event-dialog/event-dialog.component';

@Component({
  selector: 'app-events',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  @Input('events') events: Array<SchoolEvent>;
  @Input('editable') editable:boolean;
  constructor(public dateTimeS: DateTimeService, public dialog: MatDialog) { }
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
    // dialogRef.afterClosed().subscribe((out)=>{console.log(out)});
  }

}
