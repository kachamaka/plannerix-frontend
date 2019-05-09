import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpService } from '../../http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-grade-dialog',
  templateUrl: './grade-dialog.component.html',
  styleUrls: ['./grade-dialog.component.css']
})
export class GradeDialogComponent implements OnInit {

  @ViewChild('subject') subject;
  @ViewChild('gradeValue') gradeValue;
  gradeValues = [2,3,4,5,6];
  constructor(
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<GradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public httpService: HttpService) { }

  ngOnInit() {
    console.log(this.subject);
  }

  checkValidGrade(){
    if(this.subject.value == undefined || this.gradeValue.value == undefined){
      this.toastr.error("Всички полета са задължителни!", "", {timeOut: 1500});
      return false;
    }else{
      this.addGrade();
      return true;
    }
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
