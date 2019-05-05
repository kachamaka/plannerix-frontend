import { StorageService } from 'src/app/shared/storage.service';
import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  userGroups = [];
  otherGroups = [];

  constructor(
    private router: Router,
    public storageService: StorageService,
    public httpService: HttpService) { }

  ngOnInit() {
    //get groups
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

  selectGroup(g){
    if(!this.storageService.isDesktop()){
      this.router.navigate(['/groups/singleGroup/' + g.group_id]);
    }else{
      this.router.navigate(['/desktop/groups/singleGroup/' + g.group_id]);
    }
  }

}
