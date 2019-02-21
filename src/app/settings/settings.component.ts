import { Component, OnInit } from '@angular/core';
import { HttpService } from '../shared/http.service';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  constructor(public httpService: HttpService) { }

  ngOnInit() {
    let user = {
      username: "trayan",
      password: "motherfucker"
    }
    // this.httpService.loginUser(user).subscribe((data:any)=>{
    //   console.log(data);
    // })
    this.httpService.loginUser(user);
  }

}
