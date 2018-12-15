import { HttpService } from './../../../../shared/http.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-additional-subjects',
  templateUrl: './additional-subjects.component.html',
  styleUrls: ['./additional-subjects.component.css']
})

export class AdditionalSubjectsComponent implements OnInit {

  displayedColumns: string[] = ['subject', 'SIP', 'ZIP'];

  dataSource = new MatTableDataSource(this.httpService.additionalSubjects);
  
  constructor(private httpService: HttpService,
    public dialogRef: MatDialogRef<AdditionalSubjectsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    
  }

  log(){
    console.log(this.httpService.additionalSubjects[this.httpService.additionalSubjects.length-1]);
  }
  

  addSubject(){
    this.httpService.additionalSubjects.push({"subject":"","checked":false,"SIP":false,"ZIP":false});
    this.dataSource.data = this.httpService.additionalSubjects;
  }

  removeSubject(i){
    this.httpService.additionalSubjects.splice(i,1);
    this.dataSource.data = this.httpService.additionalSubjects;
  }

  checkAdd(){
    let disabled;
    if(this.httpService.additionalSubjects.length!=0){
      for(let i = 0;i<this.httpService.additionalSubjects.length;i++){
        if(this.httpService.additionalSubjects[i].subject==""){
          disabled = true;
          break;
        }else{
          disabled = false;
        }
      }
    }else{
      disabled = false;
    }
    return disabled;
  }

  close(msg) {
    console.log(msg);
    // this.httpService.additionalSubjects = this.httpService.additionalSubjects;
    this.dialogRef.close(msg);
  }

}
