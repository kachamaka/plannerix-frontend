import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ModifyScheduleState } from 'src/app/states/modifySchedule.state';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/subject.model';
import { AddSubject, RemoveSubject, AllModifiedSubjectsServer } from 'src/app/actions/modifySchedule.action';
import { MatDialog } from '@angular/material';
import { AddSubjectComponent } from './add-subject/add-subject.component';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.css']
})
export class SubjectsComponent implements OnInit {

  @Select(ModifyScheduleState.getSubjects) subjects:Observable<Subject>;

  constructor(private store: Store, public dialog: MatDialog) { }

  ngOnInit() {
    this.subjects.subscribe(s=>{
      console.log("subjects:",s);
    })
    // this.store.dispatch(new AddSubject(new Subject("bg")))
  }

  deleteSubject(s: Subject){
    this.store.dispatch(new RemoveSubject(s));
  }

  openDialog() {
    let ref = this.dialog.open(AddSubjectComponent);
    ref.afterClosed().subscribe(info=>{
      if(info) {
        this.store.dispatch(new AddSubject(new Subject(info)));
      }
    })
  }


}
