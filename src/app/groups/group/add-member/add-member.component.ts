import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/http.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {
  user = new FormControl("", [Validators.required])
  constructor(
    private httpService: HttpService,
    public dialogRef: MatDialogRef<AddMemberComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {groupID: string}
    ) { }

  ngOnInit() {
  }
  addMember(){
    if (this.user.invalid) return;
    if(this.httpService.currentGroup.members == null){
      this.httpService.currentGroup.members = []
    }
    this.httpService.addMember(this.user.value, this.data.groupID).subscribe((data:any)=>{
      console.log(data);
      if(data.success==true){
        this.httpService.currentGroup.members.push(this.user.value);
      }
      this.dialogRef.close(true);
    });
  }
}
