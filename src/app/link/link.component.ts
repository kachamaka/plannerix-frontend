import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    private httpService: HttpService) { }

  ngOnInit() {
    this.verificationKey = this.route.snapshot.queryParamMap.get("verificationKey");
    console.log(this.verificationKey);
    if(this.verificationKey){
      let postData = {
        verificationKey: this.verificationKey
      }
      this.httpService.registerUser(postData).subscribe((data:any)=>{
        localStorage.setItem("token", data.token);
        this.router.navigate(['/home'])
      })
    }
    // this.verificationKey = this.route.snapshot.paramMap.get("verificationKey")
  }

}
