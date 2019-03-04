import { HttpService } from './../../../shared/http.service';
import { StorageService } from './../../../shared/storage.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit, OnDestroy {
  
  username = "";
  email = "";
  password = "";
  confirmPassword = "";
  usernameError;
  emailError;
  passwordError;
  confirmPasswordError;
  

  constructor(
    private httpService: HttpService,
    public storageService: StorageService) { }

  ngOnInit() {
    // localStorage.removeItem("password");
    if(localStorage.getItem("username") != "" && localStorage.getItem("username") != undefined){
      this.username = localStorage.getItem("username");
    }
    if(localStorage.getItem("email") != "" && localStorage.getItem("email") != undefined){
      this.email = localStorage.getItem("email");
    }
  }

  saveData(){
    localStorage.setItem("username", this.username);
    localStorage.setItem("email", this.email);
    localStorage.setItem("password", this.password);
  }

  getData(){
    let user = {
      "username":localStorage.getItem("username"),
      "email":localStorage.getItem("email"),
    }
    return user;
  }

  usernameValid(){
    if(this.httpService.usernameRegex.test(this.username)){
      return true;
    }else{
      if(this.username == ""){
        this.usernameError = "*Това поле е задължително";
      }else{
        this.usernameError = "*Невалидно потребителско име";
      }
      return false;
    }
  }
  
  validateEmail(){
    if(this.httpService.emailRegex.test(this.email)){
      return true;
    }else{
      if(this.email == ""){
        this.emailError = "*Това поле е задължително";
      }else{
        this.emailError = "*Невалиден имейл адрес";
      }
    }
    return false;
  }
  
  validatePassword(){
    if(this.httpService.passwordRegex.test(this.password)){
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
      this.confirmPasswordError = "*Това поле е задължително";
      return false;
    }
    if(this.password != this.confirmPassword){
      this.confirmPasswordError = "*Паролите не съвпадат";
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    this.saveData();
  }

}
