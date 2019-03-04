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
  notifications = {
    eventsN: true,
    periodN:true,
    improvementN: true
  }
  allN = true;
  timer;

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
      this.notifications.eventsN = false;
      this.notifications.improvementN = false;
      this.notifications.periodN = false;
    }else{
      this.notifications.eventsN = true;
      this.notifications.improvementN = true;
      this.notifications.periodN =true;
    }
  }

  checkAll(id: number){
    clearTimeout(this.timer);
    if (this.allN == true && id == 0) {
      this.notifications.eventsN = false;
      this.notifications.improvementN = false;
      this.notifications.periodN = false;
    }
    if (this.allN == false && id == 0) {
      this.notifications.eventsN = true;
      this.notifications.improvementN = true;
      this.notifications.periodN = true;
    }
    let noftrue = 0
    let noffalse = 0
    for (const key in this.notifications) {
      if (this.notifications.hasOwnProperty(key)) {
        const element = this.notifications[key];
        if (element == true) {
          noftrue++
        } else {
          noffalse ++
        }
      }
    }
    if (noffalse==Object.keys(this.notifications).length) {
      this.allN = false;
    } else if (noftrue>=1) {
      this.allN = true
    }
    this.timer = setTimeout(()=>{
      console.log("Timer is called");
      let postData = {
        token: localStorage.getItem("token"),
        notifications: {
          all: this.allN,
          events: this.notifications.eventsN,
          period: this.notifications.periodN,
          improvement: this.notifications.improvementN
        }
      }
      this.httpService.updateNotifications(postData).subscribe((data)=>{
        console.log(data);
      })
    }, 1000)
  }

  logout(){
    this.httpService.logoutUser();
    this.router.navigate(['/login']);
  }

}
