import { HttpService } from './../../../shared/http.service';
import { StorageService } from './../../../shared/storage.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy, DoCheck } from '@angular/core';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit, OnDestroy, DoCheck {
  
  @ViewChild('test') test: ElementRef;
  @ViewChild('username') username: ElementRef;
  @ViewChild('email') email: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;
  usernameError;
  emailError;
  

  constructor(
    private httpService: HttpService,
    public storageService: StorageService) { }

  ngOnInit() {
    // localStorage.removeItem("password");
  }

  saveData(){
    localStorage.setItem("username", this.username.nativeElement.value);
    localStorage.setItem("email", this.email.nativeElement.value);
    localStorage.setItem("password", this.password.nativeElement.value);
  }

  getData(){
    let user = {
      "username":localStorage.getItem("username"),
      "email":localStorage.getItem("email"),
    }
    return user;
  }

  usernameValid(){
    if(this.httpService.usernameRegex.test(this.username.nativeElement.value)){
      return true;
    }else{
      if(this.username.nativeElement.value == ""){
        this.usernameError = "*Това поле е задължително";
      }else{
        this.usernameError = "*Невалидно потребителско име";
      }
      return false;
    }
  }

  ngDoCheck(): void {
    console.log(this.validateEmail());    
  }

  
  validateEmail(){
    // console.log(this.httpService.emailRegex.test(this.email.nativeElement.value));
    // console.log(this.emailError);
    if(this.httpService.emailRegex.test(this.email.nativeElement.value)){
      return true;
    }else{
      if(this.email.nativeElement.value == ""){
        this.emailError = "*Това поле е задължително";
      }else{
        this.emailError = "*Невалиден имейл адрес";
      }
    }
    return false;
  }

  log(e){
    console.log(e);
    // console.log(this.username.nativeElement.value,
    //   this.firstname.nativeElement.value,
    //   this.password.nativeElement.value,
    //   this.confirmPassword.nativeElement.value);
    // console.log(this.test.nativeElement.value);
    // console.log(this.storageService.currentUrl == "register");
  }

  ngOnDestroy() {
    this.saveData();
  }

}
