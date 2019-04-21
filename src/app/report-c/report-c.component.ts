import { GradeDialogComponent } from './../shared/grades/grade-dialog/grade-dialog.component';
import { HttpService } from './../shared/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatSnackBar, MatBottomSheet, MatBottomSheetRef} from '@angular/material';
import { isUndefined } from 'util';
import { GradeToastComponent } from '../shared/grades/grade-toast/grade-toast.component';
import { Router } from '@angular/router';
import { StorageService } from '../shared/storage.service';


@Component({
  selector: 'app-report-c',
  templateUrl: './report-c.component.html',
  styleUrls: ['./report-c.component.css']
})

export class ReportCComponent implements OnInit {
  
  constructor(
      private bottomSheet: MatBottomSheet,
      private snackBar: MatSnackBar,
      public dialog: MatDialog,
      private httpService: HttpService,
      public storageService: StorageService,
      private router: Router
    ){}

  ngOnInit() {
    // console.log(this.router.url);
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

  openBottomSheet(){
    // console.log("test");
    this.bottomSheet.open(BottomSheetOverviewExampleSheet);
  }
  
}

@Component({
  selector: 'bottom-sheet-overview-example-sheet',
  templateUrl: 'bottom-sheet-overview-example-sheet.html',
  styleUrls: ['bottom-sheet-overview-example-sheet.css']
})
export class BottomSheetOverviewExampleSheet implements OnInit {

  @ViewChild(ReportCComponent) reportC: ReportCComponent;
  

  constructor(
    public dialog: MatDialog,
    private httpService: HttpService,
    public storageService: StorageService,
    private router: Router,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  ngOnInit(){
    console.log(this.storageService.fullUrl);
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

  dismissBottomSheet(){
    this.bottomSheetRef.dismiss();
    // console.log(e.target);
    // console.log("test");
  }
}