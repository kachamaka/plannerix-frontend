import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScheduleComponent} from './schedule.component';
import { MatMenuModule, MatFormFieldModule, MatDividerModule, MatTableModule, MatInputModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimeModule } from '../models/time.module';

@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatTableModule,
    MatInputModule,
    NgxMaterialTimepickerModule.forRoot(),
    MatOptionModule,
    MatSelectModule,
    TimeModule
  ],
  exports: [ScheduleComponent]
})
export class ScheduleModule { }
