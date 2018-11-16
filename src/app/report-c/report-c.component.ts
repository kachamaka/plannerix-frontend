import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-c',
  templateUrl: './report-c.component.html',
  styleUrls: ['./report-c.component.css']
})
export class ReportCComponent implements OnInit {

  days = [{"day":"Monday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]},
  {"day":"Tuesday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]},
  {"day":"Wednesday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]},
  {"day":"Thursday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]},
  {"day":"Friday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]}];
  constructor() { }

  ngOnInit() {
  }

}
