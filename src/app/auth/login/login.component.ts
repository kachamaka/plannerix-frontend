import { HttpService } from './../../shared/http.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from 'src/app/shared/setup/notifications.service';

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

  usernameInvalid = "*Потребителското име трябва да бъде между 3 и 16 символа";
  passwordInvalid = "*Паролата трябва да бъде между 8 и 35 символа";
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private httpService: HttpService,
    private notService: NotificationsService
    ) { }

  ngOnInit() {
    this.userCredentials = this.formBuilder.group({
      usernameField: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]],
      passwordField: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(35)]]
    });  
  }

  get f() { return this.userCredentials.controls; }  

  log(){
    console.log("log");
  }

  validForm(){
    let username = this.username.nativeElement.value;
    let password = this.password.nativeElement.value;
    if(username == "" || password == ""){
      return false
    }else{
      if(username.length < 3 || password.length < 8){
        return false;
      }else{
        return true;
      }
    }
  }

  login(){
    let postData = {
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value
    }
    this.httpService.loginUser(postData).subscribe((data:any)=>{
      if(data.success==true){
        this.toastr.success("Влизането успешно!");
        localStorage.setItem("token", data.token);
        this.httpService.loadSchedule();
        this.httpService.loadSubjects();
        this.router.navigate(['/home']);
        this.notService.askForNotifications().then(()=>{
          return this.notService.registerForPushMessages()
        }).then((subscription:string)=>{
          this.httpService.registerPush(subscription).subscribe((data)=>{
            console.log(data, "registered")
          })
        }).catch(err=>{
          console.error("Something went wrong with registration for push messages", err);
        })
      }else{
        console.log(data);
        this.toastr.error(data.errMsg ,"Грешка при влизането!");
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
