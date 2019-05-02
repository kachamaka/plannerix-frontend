import { SchoolEvent } from './../../shared/event.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  groupID;
  currentGroup;

  group_events: Array<SchoolEvent> = [
    new SchoolEvent(1556939226000, "Немски", "ZA WARUUUDOOOOO1", 1),
    new SchoolEvent(1556939228000, "NE", "ZA WARUUUDOOOOO2", 1),
    new SchoolEvent(1556939230000, "NE", "ZA WARUUUDOOOOO3", 1),
    new SchoolEvent(1556939240000, "NE", "ZA WARUUUDOOOOO4", 1)
  ]

  constructor(
    private router: Router,
    public httpService: HttpService, 
    private route: ActivatedRoute) {

    }
   

  ngOnInit() {
    this.route.params.subscribe((params:any)=> {
      this.groupID = params.group_id;      
      console.log('groupID :', this.groupID);
      this.currentGroup = this.httpService.exampleGroups.filter(g => g.group_id == this.groupID)[0];
    })
    console.log(this.currentGroup);
  }

  canEdit(){
    if(this.currentGroup.owner == this.httpService.username){
      return true;
    }else{
      return false;
    }
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

}
