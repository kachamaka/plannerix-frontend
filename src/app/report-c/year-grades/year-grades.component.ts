import { Component, OnInit } from '@angular/core';
import { Grade } from 'src/app/shared/grades.model';
import { ReportCardHttpService } from '../report-card-http.service';

@Component({
  selector: 'app-year-grades',
  templateUrl: './year-grades.component.html',
  styleUrls: ['./year-grades.component.css']
})
export class YearGradesComponent implements OnInit {
  yearGrades
  constructor(private httpS: ReportCardHttpService) { }

  ngOnInit() {
    this.yearGrades = this.httpS.getYearsGrades();
  }


}
