import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';
import { StorageService } from './../shared/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
  password = "";
  passwordError;
  confirmPassword = "";
  confirmPasswordError;
  // @ViewChild('confirmPasswordViewChild') confirmPasswordViewChild: ElementRef;
  passwordForm: FormGroup;


  constructor(
      private fb: FormBuilder,
      private router: Router,
      public httpService: HttpService,
      public storageService: StorageService
    ) { }

  ngOnInit() {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(35)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(35)]]
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


  validatePassword(){
    if(this.httpService.emailRegex.test(this.password)){
      return true;
    }else{
      if(this.password == ""){
        this.passwordError = "*Това поле е задължително";
      }else{
        this.passwordError = "*Невалидна парола";
      }
    }
    return false;
  }
  
  validateConfirmPassword(){
    if(this.confirmPassword == ""){
      this.passwordForm.controls['password'].setErrors({'incorrect':true});
      // (this.confirmPasswordViewChild.nativeElement as HTMLInputElement).setCustomValidity("INVALID WE");
      this.confirmPasswordError = "*Това поле е задължително";
      return false;
    }
    if(this.password != this.confirmPassword){
      this.confirmPasswordError = "*Паролите не съвпадат";
      return false;
    }
    // this.confirmPasswordError = "";
    return true;
  }


  updateNotifications(){
    console.log("update notifications");
  }

  changePassword(){
    console.log(this.password, this.confirmPassword);

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
