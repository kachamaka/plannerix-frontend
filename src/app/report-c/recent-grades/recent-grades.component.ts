import { Component, OnInit } from '@angular/core';
import { ReportCardHttpService } from '../report-card-http.service';
import { DailyGrades } from 'src/app/shared/weeklyGrades.model';

@Component({
  selector: 'app-recent-grades',
  templateUrl: './recent-grades.component.html',
  styleUrls: ['./recent-grades.component.css']
})
export class RecentGradesComponent implements OnInit {
  constructor(private httpS: ReportCardHttpService){}

  weeklyGrades:Array<DailyGrades>

  ngOnInit() {
    this.weeklyGrades = this.httpS.getWeeklyGrades();
  }

  
}
