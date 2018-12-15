import { SingleSubject } from './../../../models/subject.model';
import { HttpService } from './../../../shared/http.service';
import { AdditionalSubjectsComponent } from './additional-subjects/additional-subjects.component';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit, OnDestroy {


  fileNameDialogRef: MatDialogRef<AdditionalSubjectsComponent>;

  displayedColumns: string[] = ['subject', 'SIP', 'ZIP'];

  constructor(public dialog: MatDialog,
    public httpService: HttpService,
    public storageService: StorageService) {
     }

  ngOnInit() {
    // console.log(this.httpService.subjects);
  }

  ngOnDestroy(){
    this.httpService.allCheckedSubjects = [];
    this.httpService.subjects.forEach(singleSubject => {
      if(singleSubject.checked == true || singleSubject.SIP == true || singleSubject.ZIP == true){
        this.httpService.allCheckedSubjects.push(singleSubject);
      }
    });
    this.httpService.additionalSubjects.forEach(subject =>{
      this.httpService.allCheckedSubjects.push(subject);
    })
  }

  
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = "100%";
    dialogConfig.data = { name: "some name"};
    dialogConfig.autoFocus = false;
    let dialogRef = this.dialog.open(AdditionalSubjectsComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(value => {
      console.log(`Dialog sent: ${value}`); 
      if(value==false){
        this.httpService.additionalSubjects = [];
      }else{
        let tempSubs: SingleSubject[] = [];
        this.httpService.additionalSubjects.forEach(subject => {
          if(subject.subject!="" && (subject.checked == true || subject.SIP == true || subject.ZIP == true)){
            // console.log(subject.checked,subject.SIP,subject.ZIP);
            tempSubs.push(subject);
          }
        });
        this.httpService.additionalSubjects = tempSubs;
      }
    });
  }

}
