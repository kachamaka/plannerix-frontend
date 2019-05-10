import { ConfirmComponent } from './../../shared/confirm/confirm.component';
import { GroupEventComponent } from './../../shared/group/group-event/group-event.component';
import { EventDialogComponent } from './../../shared/event/event-dialog/event-dialog.component';
import { StorageService } from './../../shared/storage.service';
import { SchoolEvent } from './../../shared/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { isUndefined } from 'util';
import { AddMemberComponent } from './add-member/add-member.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupID;

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
    if(this.httpService.exampleGroups.length == 0){
      this.loadGroups()
      .then(()=>{
        this.route.params.subscribe((params:any)=> {
          this.groupID = params.group_id;      
          // console.log('groupID :', this.groupID);
          this.httpService.currentGroup = this.httpService.exampleGroups.filter(g => g.group_id == this.groupID)[0];
        })
      })
      .then(()=>{
        this.httpService.loadGroupEvents();
        }
      );
    }else{
      this.route.params.subscribe((params:any)=> {
        this.groupID = params.group_id;      
        // console.log('groupID :', this.groupID);
        this.httpService.currentGroup = this.httpService.exampleGroups.filter(g => g.group_id == this.groupID)[0];
        this.httpService.loadGroupEvents();
      })
    }
    // console.log(this.currentGroup);
  }

  canEdit(){
    if(this.httpService.currentGroup.owner == this.httpService.username){
      return true;
    }else{
      return false;
    }
  }


  isOwner(){
    if(!isUndefined(this.httpService.currentGroup)){
      if(this.httpService.currentGroup.owner == this.httpService.username){
        return true;
      }else{
        return false;
      }
    }else{
      return false;
    }
  }

  addGroupEvent(){
    console.log("works");
    
    let dialogRef= this.dialog.open(GroupEventComponent, {
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
        // console.log(out);
        let subject = this.httpService.subjectData.filter(s => s.name == out.subject)[0];
        // return;
        let postData = {
          token: localStorage.getItem("token"),
          group_id: this.httpService.currentGroup.group_id,
          timestamp: out.date,
          subject_id: subject.id,
          description: out.description,
          subjectType: out.type
        } 
        console.log(postData);
        this.httpService.createGroupEvent(postData).subscribe((data:any)=>{
          console.log(data);
          if(data.success==true){
            // this.httpService.this.loloadEvents();
            this.httpService.loadGroupEvents();
          }
        })
      }
    })
  }

  deleteMember(member){
    // console.log(member);
    this.httpService.currentGroup.members = this.httpService.currentGroup.members.filter(mem => mem != member);
    let postData = {
      token: localStorage.getItem("token"),
      group_id: this.groupID,
      member: member
    }
    this.httpService.deleteMember(postData).subscribe((data:any)=>{
      console.log(data);
    })
    //update members
    
  }

  deleteGroup(){
    
    let dialogRef= this.dialog.open(ConfirmComponent, {});
    dialogRef.afterClosed().subscribe((out)=>{
      if(out==true){
        let postData = {
          token: localStorage.getItem("token"),
          group_id: this.groupID
        }
        this.httpService.deleteGroup(postData).subscribe((data:any)=>{
          console.log(data);
          if(data.success==true){
              if(this.storageService.isDesktop()){
                this.router.navigate(['/desktop/groups'])
              }else{
                this.router.navigate(['/groups'])
              }
          }
        })
      }
    })
  }

  leaveGroup(){
    console.log("test");

    let dialogRef= this.dialog.open(ConfirmComponent, {});
    dialogRef.afterClosed().subscribe((out)=>{
      if(out==true){
        let postData = {
          token: localStorage.getItem("token"),
          group_id: this.groupID
        }
        this.httpService.leaveGroup(postData).subscribe((data:any)=>{
          console.log(data);
          if(data.success==true){
              if(this.storageService.isDesktop()){
                this.router.navigate(['/desktop/groups'])
              }else{
                this.router.navigate(['/groups'])
              }
          }
        })
      }
    })
  }

  loadGroups(){
    let postData = {
      token: localStorage.getItem("token"),
    }
    return new Promise((resolve, reject) => {
      this.httpService.getGroups(postData).subscribe((data:any)=>{
        this.httpService.exampleGroups = data.ownedGroups.concat(data.myGroups);
        resolve();
      })  
    }) 
  }

  loadGroup(){
    this.route.params.subscribe((params:any)=> {
      this.groupID = params.group_id;      
      console.log('groupID :', this.groupID);
      this.httpService.currentGroup = this.httpService.exampleGroups.filter(g => g.group_id == this.groupID)[0];
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
