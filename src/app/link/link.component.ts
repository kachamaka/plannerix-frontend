import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../shared/setup/notifications.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {
  verificationKey;
  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private httpService: HttpService,
    private notService: NotificationsService
    ) { }

  ngOnInit() {
    this.verificationKey = this.route.snapshot.queryParamMap.get("verificationKey");
    if(this.verificationKey){
      let postData = {
        verificationKey: this.verificationKey
      }
      this.httpService.registerUser(postData).subscribe((data:any)=>{
        localStorage.setItem("token", data.token);
        this.router.navigate(['/home']);
        this.notService.registerForPushMessages().then((sub:string)=>{
          this.httpService.wellcomeNotificationAndRegister(sub).subscribe(d =>{
            console.log("registered?",d)
          })
        }).catch(err=>{
          console.error(err)
        })
      })
    }
    // this.verificationKey = this.route.snapshot.paramMap.get("verificationKey")
  }

}
