import { isUndefined } from 'util';
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
    // {
    //   year:2018, grades: [
    //     {subject: "BG", grades :[5,6,4,3]},
    //     {subject: "Math", grades :[5,6,4,3]},
    //     {subject: "Chem", grades :[5,6,4,3]}
    //   ]
    // },{
    //   year: 2017, grades: [
    //     {subject: "BG", grades :[5,6,4,3]},
    //     {subject: "Math", grades :[5,6,4,3]},
    //     {subject: "Chem", grades :[5,6,4,3]}
    //   ]
    // }
  ]
  today = new Date();
  constructor(private httpService: HttpService) { }

  ngOnInit() {
    let postData = {
      token: localStorage.getItem("token")
    }
    // console.log(this.today.getMonth()+1)
    // if(this.today.getMonth()+1 >= 2 && this.today.getMonth()+1 <= 8){

    // }
    // console.log(terms);
    this.httpService.getAllGrades(postData).subscribe((data:any)=>{
      console.log(data);
      if(data.success==true){
        for(let i = 0; i<data.grades.length; i++){
          
          // console.log(new Date(data.grades[i].timestamp*1000).getFullYear());
          let gradeDate = new Date(data.grades[i].timestamp*1000);
          let gradeYear = gradeDate.getFullYear();
          // console.log(data.grades[i].subject, gradeYear);
          let terms;

          let pastYear = false;
          if(gradeDate.getMonth()>7){
            terms = this.getTermsForYear(gradeYear);
          }else{
            pastYear = true;
            terms = this.getTermsForYear(gradeYear-1);
          }

          if(pastYear==true){
            gradeYear--;
          }
          
          // if(terms)
          console.log(terms.term1.start)
          // console.log(terms.end.getTime()/1000, data.grades[i].timestamp);
           
          let gradesWithinYear = this.allGrades.find(obj => obj.year == gradeYear);
          console.log(gradesWithinYear);
          if(isUndefined(gradesWithinYear)){
            this.allGrades.push({
              year: gradeYear,
              grades: [{subject: data.grades[i].subject, grades :[data.grades[i].value]}]
            });
          }else{
            let gradesForSubject = gradesWithinYear.grades.find(obj => obj.subject == data.grades[i].subject);
            if(isUndefined(gradesForSubject)){
              gradesWithinYear.grades.push(
                {subject: data.grades[i].subject, grades :[data.grades[i].value]}
              );
            }else{
              gradesForSubject.grades.push(data.grades[i].value);
            }            
          }
        }
      }
    });
    
  }

  checkIfExistingValue(obj, key, value) {
    return obj.hasOwnProperty(key) && obj[key] === value;
  }

  getTermsForYear(year){
    let term1 = {
      start: new Date(year, 8, 1, 0, 0, 0, 0),
      end: new Date(year+1, 0, 31, 23, 59, 0, 0)
    }
    let term2 = {
      start: new Date(year+1, 1, 1, 0, 0, 0, 0),
      end: new Date(year+1, 7, 31, 23, 59, 0, 0)
    }    
    let terms = {
      term1: term1,
      term2: term2
    }
    return terms;
  }

}
