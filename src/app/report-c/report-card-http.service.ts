import { HttpService } from './../shared/http.service';
import { Injectable } from '@angular/core';
import { DailyGrades } from '../shared/weeklyGrades.model';
import { DateTimeService } from '../shared/date-time.service';
import { Grade } from '../shared/grades.model';

@Injectable()
export class ReportCardHttpService {
    constructor(
        private httpService:HttpService,
        private dateTime: DateTimeService){}
    // a function that returns the grades from the last 7 days
    // a function that returns all grades from this year
    // a function that returns all grades from all years
    getYearsGrades() {
        //should return an observable with all grades
        let yearGrades: Array<Grade> = [
            {subject: "Bg", grades:[5,4,6,4]},
            {subject: "Math", grades: [4,5,6,2,5,4,3]},
        ]
        return yearGrades;
    }

    getWeeklyGrades() {
        // let postData = {
        //     "token": localStorage.getItem("token")
        // }
        // this.httpService.getWeeklyGrades(postData).subscribe((data:any)=>{

        // })
        //should return an observable with 7 days
        let weeklyGrades: Array<DailyGrades> = [
            {date: "06.01.2019",grades:[
              {subject: 'Music', grades: [5,5]},
              {subject: 'IT', grades: [5,6]}
            ]},
            {date: "09.01.2019", grades :[
                {subject: 'Nz', grades:[4,5]}
            ]},
            {date: "05.01.2019", grades :[
              {subject:'Math', grades: [6]},
              {subject: 'Bg', grades: [4,5]}
            ]},
            {date: "07.01.2019", grades :[
              {subject: 'History', grades:[4,5]}
            ]},
          ]
        return this.sort(weeklyGrades);
    }


    sort(arr : Array<DailyGrades>) {
        let n = arr.slice();
        let final: Array<DailyGrades> = [];
        while(final.length != arr.length) {
            let i = this.findLatest(n)
            final.push(n.splice(i,1)[0]);
        }
        return final;
    }

    findLatest(arr : Array<DailyGrades>):number {
        let index:number=0;
        for(let i = 0; i < arr.length; i++) {
            if(this.dateTime.stringToDate(arr[i].date) < this.dateTime.stringToDate(arr[index].date)) {
                index = i;
            }
        }
        return index
    }
}