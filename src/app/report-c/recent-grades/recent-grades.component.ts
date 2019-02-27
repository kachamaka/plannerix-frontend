import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { DailyGrades } from 'src/app/shared/weeklyGrades.model';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-recent-grades',
  templateUrl: './recent-grades.component.html',
  styleUrls: ['./recent-grades.component.css']
})
export class RecentGradesComponent implements OnInit {
  constructor(public httpService: HttpService){}

  
  // weeklyGrades:Array<DailyGrades> = [];

  ngOnInit() {
    this.httpService.loadWeeklyGrades();
  }


  
}
