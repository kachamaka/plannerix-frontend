import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import { MatDividerModule } from '@angular/material';
import { GradesModule } from '../shared/grades/grades.module';
import { EventListModule } from '../shared/event/event-list.module';
import { ReportCardModule } from '../report-c/report-card.module';
import { NextLessonComponent } from './next-lesson/next-lesson.component';
import { TimePipe } from '../models/timeConverter.model';
import { TimeModule } from '../models/time.module';

@NgModule({
  declarations: [
    HomeComponent,
    NextLessonComponent,
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    GradesModule,
    EventListModule,
    TimeModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
