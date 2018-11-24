import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-old-grades',
  templateUrl: './old-grades.component.html',
  styleUrls: ['./old-grades.component.css']
})
export class OldGradesComponent implements OnInit {
  
  allGrades = [{"subject":"BG","grades":[5,6,4,2]},
  {"subject":"Math","grades":[6,6,6,6,6,6]},
  {"subject":"English","grades":[5,6,4,6]}];

  constructor() { }
  
  ngOnInit() {
  }

}
