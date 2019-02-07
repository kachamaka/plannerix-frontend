import { Component, OnInit } from '@angular/core';
import { ReportCardHttpService } from '../report-card-http.service';

@Component({
  selector: 'app-all-grades',
  templateUrl: './all-grades.component.html',
  styleUrls: ['./all-grades.component.css']
})
export class AllGradesComponent implements OnInit {
  yearGrades;
  allGrades = [
    {
      year:2018, grades: [
        {subject: "BG", grades :[5,6,4,3]},
        {subject: "Math", grades :[5,6,4,3]},
        {subject: "Chem", grades :[5,6,4,3]}
      ]
    },{
      year: 2017, grades: [
        {subject: "BG", grades :[5,6,4,3]},
        {subject: "Math", grades :[5,6,4,3]},
        {subject: "Chem", grades :[5,6,4,3]}
      ]
    }
  ]
  constructor(private httpS: ReportCardHttpService) { }

  ngOnInit() {

    this.yearGrades = this.httpS.getYearsGrades();
  }

}
