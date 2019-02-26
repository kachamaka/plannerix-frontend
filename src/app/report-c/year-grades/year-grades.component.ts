import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { Grade } from 'src/app/shared/grades.model';
import { ReportCardHttpService } from '../report-card-http.service';

@Component({
  selector: 'app-year-grades',
  templateUrl: './year-grades.component.html',
  styleUrls: ['./year-grades.component.css']
})
export class YearGradesComponent implements OnInit {
  yearGrades: Array<Grade> = [];
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    let postData = {
      token: localStorage.getItem("token")
    }
    this.httpService.getYearGrades(postData).subscribe((data:any)=>{
      console.log(data.grades);
      if(data.success==true){
        for(let i = 0; i<data.grades.length; i++){
          let exists = false;
          for(let k = 0; k<this.yearGrades.length; k++){
            if(this.yearGrades[k].subject==data.grades[i].subject){
              exists = true;
              this.yearGrades[k].grades.push(data.grades[i].value);
              break;
            }else {
              exists = false;
            }
          }
          if(exists == false){
            this.yearGrades.push(new Grade(data.grades[i].subject, []));
            this.yearGrades[this.yearGrades.length-1].grades.push(data.grades[i].value);
          }
          
        }
      }
    });
  }


}
