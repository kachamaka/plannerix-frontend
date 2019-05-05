import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { ModifyScheduleState } from 'src/app/states/modifySchedule.state';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/subject.model';
import { MatDialog } from '@angular/material';
import { ChoiceDialogComponent } from './choice-dialog/choice-dialog.component';

@Component({
  selector: 'app-chose-subject',
  templateUrl: './chose-subject.component.html',
  styleUrls: ['./chose-subject.component.css']
})
export class ChoseSubjectComponent implements OnInit {
  @Select(ModifyScheduleState.getSubjects) subjects:Observable<Subject>;

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }
  openDialog(subject: Subject) {
    let ref = this.dialog.open(ChoiceDialogComponent, {data: {subject: subject}});
    ref.afterClosed().subscribe(result=>{
      // console.log(result);
    })
  }
  // openDialogWithBreak() {
  //   let ref = this.dialog.open(ChoiceDialogComponent, {data: {break: true}});
  // }
}
