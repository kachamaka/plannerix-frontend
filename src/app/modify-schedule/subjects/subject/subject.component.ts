import { Component, OnInit, Input} from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { Store, UpdateState } from '@ngxs/store';
import { UpdateSubject, RemoveSubject } from 'src/app/actions/modifySchedule.action';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {
  @Input("subject") subject: Subject;
  edit: boolean= false;
  constructor(private store: Store) { }

  ngOnInit() {
    
  }
  toggleEdit() {
    this.edit = !this.edit;
  }
  updateSubject(newName: any) {
    this.store.dispatch(new UpdateSubject(this.subject, newName));
    this.toggleEdit();
  }

  deleteSubject() {
    this.store.dispatch(new RemoveSubject(this.subject));
  }



}
