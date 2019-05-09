import { MatDialog } from '@angular/material';
import { StorageService } from 'src/app/shared/storage.service';
import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupDialogComponent } from '../shared/group/group-dialog/group-dialog.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  userGroups = [];
  otherGroups = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    public storageService: StorageService,
    public httpService: HttpService) { }

  ngOnInit() {
    //get groups
    if(this.httpService.exampleGroups.length == 0){
      this.loadGroups();
    }else{
      this.distributeGroups();
    }
  }

  distributeGroups(){
    this.httpService.exampleGroups.forEach(group => {
      if(group.owner == this.httpService.username){
        this.userGroups.push(group);
      }else{
        this.otherGroups.push(group);
      }
    });
  }

  loadGroups(){
    this.userGroups = [];
    this.otherGroups = [];
    let postData = {
      token: localStorage.getItem("token"),
    }
    this.httpService.getGroups(postData).subscribe((data:any)=>{
      this.httpService.exampleGroups = data.ownedGroups.concat(data.myGroups);
      console.log(this.httpService.exampleGroups);
      this.httpService.exampleGroups.forEach(gr => {
        if(gr.owner == this.httpService.username){
          this.userGroups.push(gr);
        }else{
          this.otherGroups.push(gr);
        }
      });
    })
  }

  selectGroup(g){
    if(!this.storageService.isDesktop()){
      this.router.navigate(['/groups/singleGroup/' + g.group_id]);
    }else{
      this.router.navigate(['/desktop/groups/singleGroup/' + g.group_id]);
    }
  }

  openDialog(){
    const dialogRef = this.dialog.open(GroupDialogComponent, {
      width: '250px',
      data: {message: "test"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      let postData = {
        token: localStorage.getItem("token"),
        group_name: result
      } 
      this.httpService.createGroup(postData).subscribe((data:any)=>{
        console.log(data);
        if(data.success==true){
          this.loadGroups();
        }
      })
    });
  }

  createGroup(){

  }

}
