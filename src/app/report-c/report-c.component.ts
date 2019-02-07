import { Component, OnInit } from '@angular/core';
import { DailyGrades } from '../shared/weeklyGrades.model';
import { ReportCardHttpService } from './report-card-http.service';

@Component({
  selector: 'app-report-c',
  templateUrl: './report-c.component.html',
  styleUrls: ['./report-c.component.css']
})

export class ReportCComponent implements OnInit {
  constructor(){}

  ngOnInit() {
  }

  
}
