import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-grade-dialog',
  templateUrl: './grade-dialog.component.html',
  styleUrls: ['./grade-dialog.component.css']
})
export class GradeDialogComponent implements OnInit {

  @ViewChild('subject') subject;
  @ViewChild('gradeValue') gradeValue;
  gradeValues = [2,3,4,5,6];
  constructor(public dialogRef: MatDialogRef<GradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpService: HttpService) { }

  ngOnInit() {
  }

  addGrade(){
    // console.log(this.subject.value);
    // console.log(this.gradeValue.value);
    
    let postData = {
      token: localStorage.getItem("token"),
      time: Math.trunc(new Date().getTime()/1000),
      subject: this.subject.value,
      value: this.gradeValue.value
    }
    this.dialogRef.close(postData);
  }

}
