import { HttpService } from './../../shared/http.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCredentials: FormGroup;
  @ViewChild('username') username;
  @ViewChild('password') password;

  // usernameField = new FormControl('', [
  //   Validators.required,
  //   Validators.minLength(3),
  //   Validators.maxLength(16)
  //   ]);

  usernameInvalid = "Between 3 and 16";
  passwordInvalid = "Between 8 and 35";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService) { }

  ngOnInit() {
    this.userCredentials = this.formBuilder.group({
      usernameField: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      passwordField: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(35)]]
    });  
    // this.userCredentials.controls['usernameField'].hasE
  }

  get f() { return this.userCredentials.controls; }  

  // ValidateUsername(control: AbstractControl) {
  //   if (this.httpService.usernameRegex.test(control.value)) {
  //     return { validPassword: true };
  //   }
  //   return null;
  // }
  

  log(){
    console.log(this.username.nativeElement.value);
    console.log(this.password.nativeElement.value);
    // console.log(this.usernameField.invalid);
  }

  login(){
    let postData = {
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value
    }
    this.httpService.loginUser(postData).subscribe((data:any)=>{
      if(data.success==true){
        localStorage.setItem("token", data.token)
        
        this.router.navigate(['/home'])
        
        //redirect
      }else{
        // if(data.errMsg)
        console.log(data);
        this.usernameInvalid = data.errMsg;
      }
    })
  }

  openRegister(){
    this.router.navigate(['/register']);
  }

  onKeydown() {
    this.login();
  }

}
