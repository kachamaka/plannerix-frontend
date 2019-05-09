import { HttpService } from './../../http.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.css']
})
export class GroupDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<GroupDialogComponent>,
    public httpService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  
  newGroup = new FormGroup({
    group_name : new FormControl(''),
  });

  ngOnInit() {
  }

  acceptEdit() {
    let groupName = this.newGroup.get("group_name").value;
    this.dialogRef.close(groupName);
  }
}
