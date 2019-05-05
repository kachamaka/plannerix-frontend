import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatChipInputEvent } from '@angular/material';
import { Validators, FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddSubject } from 'src/app/actions/modifySchedule.action';
import { Subject } from 'src/app/models/subject.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  // @ViewChild("input") input: HTMLInputElement;
  name = new FormControl('', [Validators.required]);
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  additions: string[] = [];

  constructor(public ref: MatDialogRef<AddSubjectComponent>, private store: Store) { }

  ngOnInit() {
  }
  addAndClose(){
    if(this.name.invalid) {
      return true;
    }
    let value:string = this.name.value;
    value = value.trim();
    this.store.dispatch(new AddSubject(new Subject(value)));
    this.additions.forEach(addition => {
      this.store.dispatch(new AddSubject(new Subject(addition + " - " + value)))
    });
    this.ref.close();
  } 
  remove(addition: string) {
    this.additions.filter((v)=>{
      return v != addition
    })
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.additions.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
} 
