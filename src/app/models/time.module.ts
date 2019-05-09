import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimePipe } from './timeConverter.model';

@NgModule({
  declarations: [

    TimePipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    TimePipe
  ]
})
export class TimeModule { }
