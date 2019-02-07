import { Component, OnInit, Input } from '@angular/core';
import { DateTimeService } from 'src/app/shared/date-time.service';
import { Grade } from 'src/app/shared/grades.model';

@Component({
  selector: 'app-day-grades',
  templateUrl: './day-grades.component.html',
  styleUrls: ['./day-grades.component.css']
})
export class DayGradesComponent implements OnInit {
  @Input('date') date: string;
  @Input('grades') grades: Array<Grade>;
  day: string;
  constructor(private dateTime: DateTimeService) { }

  ngOnInit() {
    let date = this.dateTime.stringToDate(this.date);
    this.day = this.dateTime.getDay(date);
  }

}
