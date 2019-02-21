import { Component, OnInit } from '@angular/core';
import { Grade } from '../shared/grades.model';
import { SchoolEvent } from '../shared/event.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  grades: Array<Grade> = [
    {subject: "Math", grades: [5,6,6]},
    {subject: "Bg", grades: [4,5,5]}
  ]

  events = [
    new SchoolEvent(1549662546, "Философия", 0),
    new SchoolEvent(1549752546, "Math", 1)
  ];
  nextLesson = "Chem";
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.post("https://l1n5cmczkh.execute-api.eu-central-1.amazonaws.com/dev/login", {"username":"trayan", "password":"motherfucker"}).subscribe((data)=>{
      console.log(data);
    })
  }


}
