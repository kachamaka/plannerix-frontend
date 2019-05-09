import { StorageService } from 'src/app/shared/storage.service';
import { AddTestComponent } from './add-test/add-test.component';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { isUndefined } from 'util';
import { HttpService } from '../shared/http.service';
import { SchoolEvent } from '../shared/event.model';
import { EventDialogComponent } from '../shared/event/event-dialog/event-dialog.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  // edit = false;
  // today = new Date();
  // test = new Date(2018,11,19);
  // displayedColumns: string[] = ['subject', 'date', 'remove'];
  // backupTests;
  fileNameDialogRef: MatDialogRef<AddTestComponent>;

  fetchedEvents: any;

  constructor(
    public storageService: StorageService,
    public httpService: HttpService,
    public dialog: MatDialog) { }
  
  // upcommingTestDates = [{"date":new Date(2018,11,26).toISOString(),"subject":"History"},
  // {"date":new Date(2018,11, 23).toISOString(),"subject":"NE"},
  // {"date":new Date(2018,11,22).toISOString(),"subject":"NE"},
  // {"date":new Date(2018,11,29).toISOString(),"subject":"Mat"},
  // {"date":new Date(2018,11,19).toISOString(),"subject":"Fizika"},
  // {"date":new Date(2018,11,25).toISOString(),"subject":"Bel"}];

  ngOnInit() {
    this.httpService.loadEvents();
    // console.log(this.httpService.subjectData);
      // this.events = data.events;
      // console.log(data.events);
    setTimeout(()=>{
      // this.addEvent();
    }, 500)
  }

  

  addEvent() {

    let dialogRef= this.dialog.open(EventDialogComponent, {
      data: {
        event: new SchoolEvent(0, Date.now(), "", "", -1),
        editable: true,
        new: true
      }
    })
    dialogRef.afterClosed().subscribe((out)=>{
      if(!out) {
        console.log("canceled");
      }
      if(out) {
        console.log(out, "out");
        // return;
        let postData = {
          token: localStorage.getItem("token"),
          timestamp: out.date,
          subject: out.subject.id,
          description: out.description,
          subjectType: out.type
        } 
        // console.log(postData);
        this.httpService.createEvent(postData).subscribe((data:any)=>{
          console.log(data);
          if(data.success==true){
            this.httpService.loadEvents();
          }
        })
      }
    })
  }
  
  // openDialog() {
  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.minWidth = "100%";
  //   dialogConfig.data = { name: "some name"};
  //   dialogConfig.autoFocus = false;
  //   let dialogRef = this.dialog.open(AddTestComponent, dialogConfig);
  //   dialogRef.afterClosed().subscribe(data => {
  //     //code
  //     if(!isUndefined(data)){
  //       console.log(`Dialog sent: ${data.message}`); 
  //       if(data.message==true){
  //         this.upcommingTestDates.push(data.data);
  //       }else{
  
  //       }
  //     }
  //   });
  // }

  test() {
    console.log("test");
  }

}
