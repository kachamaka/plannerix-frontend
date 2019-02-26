import { GradeDialogComponent } from './../shared/grades/grade-dialog/grade-dialog.component';
import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import { isUndefined } from 'util';
import { GradeToastComponent } from '../shared/grades/grade-toast/grade-toast.component';


@Component({
  selector: 'app-report-c',
  templateUrl: './report-c.component.html',
  styleUrls: ['./report-c.component.css']
})

export class ReportCComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private httpService: HttpService){}

  ngOnInit() {
  }

  addGradeDialog(): void {
    const dialogRef = this.dialog.open(GradeDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(!isUndefined(result)){
        console.log(result.time);
        this.httpService.inputGrade(result).subscribe((data:any)=>{
          if(data.success==true){
            this.httpService.loadWeeklyGrades();
          }
        })
      }
    });
  }
  
  inputGradeToast(message) {
    this.snackBar.open(message, "", {
      duration: 3000
    });
  }

  // addGradeDialog(){
    // let postData = {
    //   token: localStorage.getItem("token"),
    //   subject: "Math",
    //   value: 2,
    //   timestamp: 0
    // }
    // this.httpService.inputGrade(postData).subscribe((data:any)=>{
    //   console.log(data);
    //   if(data.success==true){
        
    //   }
    // })

  // }

  
}
