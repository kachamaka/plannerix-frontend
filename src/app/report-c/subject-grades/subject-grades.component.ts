import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-subject-grades',
  templateUrl: './subject-grades.component.html',
  styleUrls: ['./subject-grades.component.css']
})
export class SubjectGradesComponent implements OnInit {
  @Input('subject') subject:string;
  @Input("grades") grades:Array<number>;
  average:number;
  constructor() { }

  ngOnInit() {
    let sum = 0;

    this.grades.forEach((grade)=>{
      sum+=grade;
    })
    this.average = Math.round((sum/this.grades.length)*100)/100;
  }

}
