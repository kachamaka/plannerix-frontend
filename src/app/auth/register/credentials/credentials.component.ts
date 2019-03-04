import { HttpService } from './../../../shared/http.service';
import { StorageService } from './../../../shared/storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

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
  
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    public storageService: StorageService) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.max(16)])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.max(35)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    })
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
      this.usernameError = "";
      return true;
    }else{
      if(this.username == ""){
        this.usernameError = "*Това поле е задължително";
        this.registerForm.controls["username"].setErrors({invalid: true});
      }else{
        this.usernameError = "*Невалидно потребителско име";
        this.registerForm.controls["username"].setErrors({invalid: true});
      }
      return false;
    }
  }
  
  validateEmail(){
    if(this.httpService.emailRegex.test(this.email)){
      this.emailError = "";
      return true;
    }else{
      if(this.email == ""){
        this.emailError = "*Това поле е задължително";
        this.registerForm.controls["email"].setErrors({invalid: true});
      }else{
        this.emailError = "*Невалиден имейл адрес";
        this.registerForm.controls["email"].setErrors({invalid: true});
      }
    }
    return false;
  }
  
  validatePassword(){
    if(this.httpService.passwordRegex.test(this.password)){
      this.passwordError = "";
      return true;
    }else{
      if(this.password == ""){
        this.passwordError = "*Това поле е задължително";
        this.registerForm.controls["password"].setErrors({invalid: true});
      }else{
        this.passwordError = "*Невалидна парола";
        this.registerForm.controls["password"].setErrors({invalid: true});
      }
    }
    return false;
  }
  
  validateConfirmPassword(){
    if(this.confirmPassword == ""){
      this.confirmPasswordError = "*Това поле е задължително";
      this.registerForm.controls["confirmPassword"].setErrors({invalid: true});
      return false;
    }
    if(this.password != this.confirmPassword){
      this.confirmPasswordError = "*Паролите не съвпадат";
      this.registerForm.controls["confirmPassword"].setErrors({invalid: true});
      return false;
    }
    this.confirmPasswordError = ""
    return true;
  }

  ngOnDestroy() {
    this.saveData();
  }

}
