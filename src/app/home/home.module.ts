import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import { MatDividerModule } from '@angular/material';
import { GradesModule } from '../shared/grades/grades.module';
import { EventListModule } from '../shared/event/event-list.module';
import { ReportCardModule } from '../report-c/report-card.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    GradesModule,
    EventListModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
