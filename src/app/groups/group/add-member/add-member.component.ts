import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  user = new FormControl("", [Validators.required])
  constructor(
    private http: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: {groupID: string}
    ) { }

  ngOnInit() {
  }
  addMember(){
    if (this.user.invalid) return;
    this.http.addMember(this.user.value, this.data.groupID);
  }
}
