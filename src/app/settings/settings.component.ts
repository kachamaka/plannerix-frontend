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
  allN = true;
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
