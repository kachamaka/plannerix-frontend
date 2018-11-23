import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  days = [{"day":"Monday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]},
  {"day":"Tuesday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]},
  {"day":"Wednesday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]},
  {"day":"Thursday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]},
  {"day":"Friday","scores":[{"subject":"English","grade":5},{"subject":"Math","grade":6}]}];

  allGrades = [{"subject":"BG","grades":[5,6,4,2]},
  {"subject":"Math","grades":[6,6,6,6]},
  {"subject":"English","grades":[5,6,4,6]}];
  constructor() { }

  ngOnInit() {
  }

}
