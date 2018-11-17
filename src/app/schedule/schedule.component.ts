import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['time','subject'];
  schedule = [
    {"time": "7:30-8:10", "subject": "Kaka Emi"},
    {"time": "8:20-9:00", "subject": "Zlatitu"},
    {"time": "9:10-9:50", "subject":"Feministkata"},
    {"time": "9:50-10:10", "subject": "Golqmo"},
    {"time": "10:10-10:50", "subject": "Meca"},
    {"time": "11:00-11:40", "subject": "Nemski"},
    {"time": "11:50-12:30", "subject": "Nemski"},
    {"time": "12:40-13:30", "subject": "Nasko"}
  ]

  ngOnInit() {
  }

}
