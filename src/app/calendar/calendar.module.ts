import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { AddTestComponent } from './add-test/add-test.component';
import { MatDividerModule, MatTableModule, MatDialogModule, MatSelectModule, MatDatepickerModule } from '@angular/material';
import { EventListModule } from '../shared/event/event-list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CalendarComponent,
    AddTestComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    EventListModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  exports: [
    CalendarComponent,
    AddTestComponent
  ]
})
export class CalendarModule { }
