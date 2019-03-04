import { StorageService } from './../shared/storage.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  username = "";
  email = "";
  panelOpenState;
  allN = true;
  eventsN = true;
  periodN = true;
  improvementN = true;


  constructor(
      private router: Router,
      public httpService: HttpService,
      public storageService: StorageService
    ) { }

  ngOnInit() {
    let postData = {
      token: localStorage.getItem("token"),
    }
    this.httpService.getProfile(postData).subscribe((data:any)=>{
      console.log(data);
      this.username = data.profile.username;
      this.email = data.profile.email;
    })
  }

  updateNotifications(){
    console.log("update notifications");
  }

  disableAll(){
    if(this.allN==true){
      this.eventsN = false;
      this.improvementN = false;
      this.periodN = false;
    }else{
      this.eventsN = true;
      this.improvementN = true;
      this.periodN =true;
    }
  }

  checkAll(id: number){
    
  }

  logout(){
    this.httpService.logoutUser();
    this.router.navigate(['/login']);
  }

}
