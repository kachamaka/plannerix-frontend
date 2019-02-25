import { HttpService } from './../../shared/http.service';
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
  today = new Date();
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    let postData = {
      token: localStorage.getItem("token")
    }
    console.log(this.today.getMonth()+1)
    if(this.today.getMonth()+1 >= 2 && this.today.getMonth()+1 <= 8){

    }
    let firstTerm = {
      start: new Date(this.today.getFullYear(), 8, 1, 0, 0, 0, 0),
      end: new Date(this.today.getFullYear()+1, 0, 31, 23, 59, 0, 0)
    }
    console.log(firstTerm);
    this.httpService.getAllGrades(postData).subscribe((data:any)=>{
      console.log(data);
      if(data.success==true){
        
      }
    });
    
  }

}
