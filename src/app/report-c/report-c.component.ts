import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-c',
  templateUrl: './report-c.component.html',
  styleUrls: ['./report-c.component.css']
})
export class ReportCComponent implements OnInit {

  days = ["Monday","Tuesday","Wednesday","Thursday","Friday"];
  constructor() { }

  ngOnInit() {
  }

}
