import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.css']
})
export class AddSubjectComponent implements OnInit {
  // @ViewChild("input") input: HTMLInputElement;
  constructor(public ref: MatDialogRef<AddSubjectComponent>) { }

  ngOnInit() {
  }
  close(name) {
    this.ref.close(name);
  }
} 
