import { EventDialogComponent } from './../../shared/event/event-dialog/event-dialog.component';
import { StorageService } from './../../shared/storage.service';
import { SchoolEvent } from './../../shared/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddMemberComponent } from './add-member/add-member.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupID;
  currentGroup;

  // group_events: Array<SchoolEvent> = [
  //   new SchoolEvent(1556939226000, "Немски", "ZA WARUUUDOOOOO1", 1),
  //   new SchoolEvent(1556939228000, "NE", "ZA WARUUUDOOOOO2", 1),
  //   new SchoolEvent(1556939230000, "NE", "ZA WARUUUDOOOOO3", 1),
  //   new SchoolEvent(1556939240000, "NE", "ZA WARUUUDOOOOO4", 1)
  // ]

  constructor(
    public storageService: StorageService,
    public dialog: MatDialog,
    private router: Router,
    public httpService: HttpService, 
    private route: ActivatedRoute) {

    }
   

  ngOnInit() {
    this.route.params.subscribe((params:any)=> {
      this.groupID = params.group_id;      
      // console.log('groupID :', this.groupID);
      this.currentGroup = this.httpService.exampleGroups.filter(g => g.group_id == this.groupID)[0];
    })
    // console.log(this.currentGroup);
  }

  canEdit(){
    if(this.currentGroup.owner == this.httpService.username){
      return true;
    }else{
      return false;
    }
  }

  addGroupEvent(){
    console.log("works");
    
    let dialogRef= this.dialog.open(EventDialogComponent, {
      data: {
        event: new SchoolEvent(Date.now(), "", "", -1),
        editable: true,
        new: true
      }
    })
    dialogRef.afterClosed().subscribe((out)=>{
      if(!out) {
        console.log("canceled");
      }
      if(out) {
        console.log(out.date);
        // return;
        let postData = {
          token: localStorage.getItem("token"),
          timestamp: out.date,
          subject: out.subject,
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

  deleteMember(member){
    // console.log(member);
    this.currentGroup.members = this.currentGroup.members.filter(mem => mem != member);
    //update members
    
  }

  loadGroup(){
    this.route.params.subscribe((params:any)=> {
      this.groupID = params.group_id;      
      console.log('groupID :', this.groupID);
      this.currentGroup = this.httpService.exampleGroups.filter(g => g.group_id == this.groupID)[0];
    })
  };
  plus(){
    this.router.navigate(['/groups/singleGroup/' + (parseInt(this.groupID)+1)]);
    this.loadGroup();
  }
  minus(){
    this.router.navigate(['/groups/singleGroup/' + (this.groupID-1)]);
    this.loadGroup();
  }
  openAddMember(){
    let dialogRef = this.dialog.open(AddMemberComponent, {data: {groupID: this.groupID}});
  }
}
