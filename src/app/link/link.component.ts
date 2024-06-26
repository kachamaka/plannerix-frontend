import { HttpService } from './../shared/http.service';
import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../shared/setup/notifications.service';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit, OnDestroy {
  verificationKey;
  constructor(
    private ngZone: NgZone,
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
        console.log("token",data.token)
        this.notService.registerForPushMessages().then((sub:string)=>{
          console.log("subscription", sub);
          this.httpService.wellcomeNotificationAndRegister(sub).subscribe(d =>{
            console.log("registered?",d)
          })
        }).catch(err=>{
          console.error("registerforPush", err)
        }).then(()=>{
          let tokenData = {
            token: localStorage.getItem("token")
          }
          this.httpService.getProfile(tokenData).subscribe((data:any)=>{
            console.log(data);
            this.httpService.username = data.profile.username;
            this.httpService.email = data.profile.email;
          })
          
        })
        .finally(()=>{
          this.router.navigate(['/home']);
        })
      })
    }
    // this.verificationKey = this.route.snapshot.paramMap.get("verificationKey")
  }

  ngOnDestroy(): void {
    
  }

}
