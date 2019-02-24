import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { DailyGrades } from 'src/app/shared/weeklyGrades.model';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-recent-grades',
  templateUrl: './recent-grades.component.html',
  styleUrls: ['./recent-grades.component.css']
})
export class RecentGradesComponent implements OnInit {
  constructor(private httpService: HttpService){}

  thisWeekMonday;
  
  weeklyGrades:Array<DailyGrades> = [
    // {date: "06.01.2019",grades:[
    //   {subject: 'Music', grades: [5,5]},
    //   {subject: 'IT', grades: [5,6]}
    // ]}
  ]

  ngOnInit() {
    // let d = new Date(new Date().setDate(new Date().getDate()+1));
    let d = new Date();
    let day = d.getDay();
    let diff = d.getDate() - day + (day == 0 ? -6 : 1);
    this.thisWeekMonday = new Date((d.setDate(diff))).getTime();
    // console.log(new Date(this.thisWeekMonday));
    // console.log(this.getDateFormat(this.thisWeekMonday.toLocaleDateString()));
    // console.log(this.thisWeekMonday.toLocaleDateString() + 86400000);


    for(let i = 0; i<5;i++){
      // let day = ;
      let gradesDate = this.getDateFormat(new Date(this.thisWeekMonday + i*86400000).toLocaleDateString());
      // console.log(gradesDate);
      let newWeeklyGrade = {
        date: gradesDate,
        grades: []
      }
      this.weeklyGrades.push(newWeeklyGrade);
    }
    // console.log(this.weeklyGrades);
    let postData = {
      token: localStorage.getItem("token")
    }
    this.httpService.getWeeklyGrades(postData).subscribe((data:any)=>{
      // console.log(data);
      for(let k = 0; k<data.weeklyGrades.length; k++){
        let gradeRawDate = new Date(data.weeklyGrades[k].timestamp*1000).toLocaleDateString();
        let gradeDate = this.getDateFormat(gradeRawDate);
        // console.log(gradeDate);
        for(let j = 0; j<this.weeklyGrades.length; j++){
          if(gradeDate == this.weeklyGrades[j].date){
            let exists = false;
            for(let l = 0; l<this.weeklyGrades[j].grades.length; l++){
              if(data.weeklyGrades[k].subject==this.weeklyGrades[j].grades[l].subject){
                exists = true;
                break;
              }
            }
            if(exists == false){
              this.weeklyGrades[j].grades.push({subject: data.weeklyGrades[k].subject, grades: []})              
              //not very sure if for or not
              this.weeklyGrades[j].grades[this.weeklyGrades[j].grades.length-1].grades.push(data.weeklyGrades[k].value);
              break;
            }else {
              for(let m = 0; m<this.weeklyGrades[j].grades.length; m++){
                if(this.weeklyGrades[j].grades[m].subject == data.weeklyGrades[k].subject){
                  this.weeklyGrades[j].grades[this.weeklyGrades[j].grades.length-1].grades.push(data.weeklyGrades[k].value);
                  break;
                }
              }
            }
          }
        }
      }
    });
  }

  getDateFormat(date){
    let dateField = date.split("/")
    if(dateField[0].length == 1){
      dateField[0] = "0" + dateField[0];
    }
    if(dateField[1].length == 1 ){
      dateField[1] = "0" + dateField[1];
    }
    let dateData = dateField[1]+"."+dateField[0]+"."+dateField[2];
    // let dateData = {
    //   dateDay: dateField[1],
    //   dateMonth: dateField[0],
    //   dateYear: dateField[2]
    // }
    return dateData
  }

  
}
