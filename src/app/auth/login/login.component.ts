import { HttpService } from './../../shared/http.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('password') password;
  constructor(
    private router: Router,
    private httpService: HttpService) { }

  ngOnInit() {
  }

  log(){
    console.log(this.username.nativeElement.value);
    console.log(this.password.nativeElement.value);
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
      }
    })
  }

  openRegister(){
    this.router.navigate(['/register']);
  }

}
