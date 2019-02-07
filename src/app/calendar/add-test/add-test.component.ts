import { HttpService } from './../../shared/http.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-add-test',
  templateUrl: './add-test.component.html',
  styleUrls: ['./add-test.component.css']
})
export class AddTestComponent implements OnInit {
  test = [{
    "subject":"Math",
    "date":new Date(2018,11,24)
  }];
  displayedColumns: string[] = ['subjectName', 'date'];
  constructor(public httpService: HttpService,
    public dialogRef: MatDialogRef<AddTestComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.test);
  }
  
  getDataSource(){
    let dataSource = new MatTableDataSource(this.test);
    return dataSource;
  }

  close(msg, payload) {
    console.log(msg);
    // this.httpService.additionalSubjects = this.httpService.additionalSubjects;
    let data = {
      message: msg,
      data: payload[0]
    }
    this.dialogRef.close(data);
  }
  

}
