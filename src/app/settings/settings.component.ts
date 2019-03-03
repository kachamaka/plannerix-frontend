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

  constructor(
    public storageService: StorageService,
    private router: Router,
    public httpService: HttpService) { }

  ngOnInit() {
    let user = {
      username: "testUser",
      password: "testing1",
      // email: "test@abv.bg",
      // subjects: ["Math"],
      // schedule: [{periods: []},{periods: []},{periods: []},{periods: []},{periods: []}]
    }
    // this.httpService.registerUser(user);
    this.httpService.loginUser(user).subscribe((data:any)=>{
      if(data.success==true){
        console.log(data);
        localStorage.setItem('token', data.token);
      }
    });
  }
  

  logout(){
    this.httpService.logoutUser();
    this.router.navigate(['/login']);
  }

}
