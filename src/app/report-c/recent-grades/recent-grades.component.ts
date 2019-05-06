import { Grade } from './../../shared/grades.model';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { DailyGrades } from 'src/app/shared/weeklyGrades.model';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { ReportCardHttpService } from '../report-card-http.service';

@Component({
  selector: 'app-recent-grades',
  templateUrl: './recent-grades.component.html',
  styleUrls: ['./recent-grades.component.css']
})
export class RecentGradesComponent implements OnInit {
  constructor(
    public repCS: ReportCardHttpService,
    public httpService: HttpService){}

  
  // weeklyGrades:Array<DailyGrades> = [];

  ngOnInit() {
    this.httpService.loadWeeklyGrades();
    
    // this.httpService.weeklyGrades = [
    //   {date: "06.05.2019",grades:[
    //     {subject: 'Физика', grades: [5]},
    //     {subject: 'Математика-ЗИП', grades: [6,6]}
    //   ]},
    //   {date: "07.05.2019", grades :[

    //   ]},
    //   {date: "08.05.2019", grades :[
    //     {subject: 'История', grades:[5]}
    //   ]},
    //   {date: "09.05.2019", grades :[
    //       {subject: 'Биология', grades:[4]}
    //   ]},
    //   {date: "10.05.2019", grades :[

    //   ]}
    // ]
    // console.log(this.httpService.weeklyGrades);
  }


  
}
