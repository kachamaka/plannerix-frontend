import { StorageService } from './../../../shared/storage.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit, OnDestroy {
  
  @ViewChild('test') test: ElementRef;
  @ViewChild('username') username: ElementRef;
  @ViewChild('firstname') firstname: ElementRef;
  @ViewChild('password') password: ElementRef;
  @ViewChild('confirmPassword') confirmPassword: ElementRef;
  

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    // localStorage.removeItem("password");
  }

  saveData(){
    localStorage.setItem("username", this.username.nativeElement.value);
    localStorage.setItem("firstname", this.firstname.nativeElement.value);
    localStorage.setItem("password", this.password.nativeElement.value);
  }

  getData(){
    let user = {
      "username":localStorage.getItem("username"),
      "firstname":localStorage.getItem("firstname"),
    }
    return user;
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
