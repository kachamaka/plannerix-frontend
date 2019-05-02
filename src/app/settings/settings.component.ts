import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from './../shared/storage.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
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
  emailForm: FormGroup;
  
  passwordError;
  confirmPasswordError;
  emailError;
  validEmail = false;


  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    public httpService: HttpService,
    public storageService: StorageService
    ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(35)])],
      confirmPassword: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(35)])]
    })
    this.emailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required])],
    })
  }

  changePassword(){
    console.log(this.passwordForm.valid);
    let postData = {
      token: localStorage.getItem("token"),
      password: this.passwordForm.controls["password"].value
    }
    this.httpService.changePassword(postData).subscribe((data:any)=>{
      this.passwordForm.reset();
      if(data.success == true){
        this.toastr.success("Паролата бе сменена успешно!");
      }else{
        this.toastr.error(data.errMsg, "Грешка!")
      }
    })
  }

  changeEmail(){
    console.log(this.emailForm.valid);
    let postData = {
      token: localStorage.getItem("token"),
      email: this.emailForm.controls["email"].value
    }
    this.httpService.changeEmail(postData).subscribe((data:any)=>{
      this.emailForm.reset();
      if(data.success == true){
        this.toastr.success("Имейлът бе сменен успешно!");
      }else{
        this.toastr.error(data.errMsg, "Грешка!")
      }
    })
  }

  updateNotifications(){
    console.log("update notifications");
  }

  checkPasswordFormValidation(){
    if(this.validatePassword()==true && this.validateConfirmPassword() == true){
      return true;
    }else{
      return false;
    }
  }

  validatePassword(){
    let password = this.passwordForm.controls["password"].value;
    if(this.httpService.passwordRegex.test(password)){
      this.passwordError = "";
      return true;
    }else{
      if(password == ""){
        this.passwordError = "*Това поле е задължително";
        this.passwordForm.controls["password"].setErrors({invalid: true});
      }else{
        this.passwordError = "*Невалидна парола";
        this.passwordForm.controls["password"].setErrors({invalid: true});        
      }
    }
    return false;
  }
  
  validateConfirmPassword(){
    let password = this.passwordForm.controls["password"].value;
    let confirmPassword = this.passwordForm.controls["confirmPassword"].value;
    if(confirmPassword == ""){
      this.confirmPasswordError = "*Това поле е задължително";
      this.passwordForm.controls["confirmPassword"].setErrors({invalid: true});
      return false;
    }
    if(password != confirmPassword){
      this.confirmPasswordError = "*Паролите не съвпадат";
      this.passwordForm.controls["confirmPassword"].setErrors({invalid: true});
      return false;
    }
    this.confirmPasswordError = "";
    return true;
  }
  
  validateEmail(){
    let email = this.emailForm.controls["email"].value;
    if(this.httpService.emailRegex.test(email)){
      this.emailError = "";
      this.validEmail = true;
      return true;
    }else{
      if(email == ""){
        this.emailError = "*Това поле е задължително";
        this.emailForm.controls["email"].setErrors({invalid: true});
      }else{
        this.emailError = "*Невалиден имейл адрес";
        this.emailForm.controls["email"].setErrors({invalid: true});
      }
    }
    this.validEmail = false;
    return false;
  }

  validateEmailForm(){
    if(this.validateEmail()==true && this.validEmail == true){
      return true;
    }else{
      return false;
    }
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
