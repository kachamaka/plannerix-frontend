import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  eventsN = true;
  periodN = true;
  improvementN = true;
  passwordForm: FormGroup;
  
  password = "";
  confirmPassword = "";
  passwordError;
  confirmPasswordError;
  validatePasswordError = "Invalid pass";


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public httpService: HttpService,
    public storageService: StorageService
    ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.required, Validators.minLength(8), Validators.maxLength(35)],
      confirmPassword: ['', Validators.required, Validators.minLength(8), Validators.maxLength(35)]
    })
    let postData = {
      token: localStorage.getItem("token"),
    }
    this.httpService.getProfile(postData).subscribe((data:any)=>{
      console.log(data);
      this.username = data.profile.username;
      this.email = data.profile.email;
    })
  }

  changePassword(){
    // console.log(this.passwordForm.controls["password"].value, this.passwordForm.controls["confirmPassword"].value);
    console.log(this.passwordForm.controls["password"].errors);
  }

  updateNotifications(){
    console.log("update notifications");
  }

  validatePassword(){
    let password = this.passwordForm.controls["password"].value;
    if(this.httpService.passwordRegex.test(password)){
      return true;
    }else{
      if(password == ""){
        this.passwordError = "*Това поле е задължително";
      }else{
        this.passwordError = "*Невалидна парола";
      }
    }
    return false;
  }
  
  validateConfirmPassword(){
    if(this.confirmPassword == ""){
      this.confirmPasswordError = "*Това поле е задължително";
      return false;
    }
    if(this.password != this.confirmPassword){
      this.confirmPasswordError = "*Паролите не съвпадат";
      return false;
    }
    return true;
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
