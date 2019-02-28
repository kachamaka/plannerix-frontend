import { StorageService } from './../../shared/storage.service';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { isNull } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  constructor(public storageService: StorageService,
    private router: Router,
    private httpService: HttpService){

  }
  
  ngOnInit() {
    
  }

  register(){
    let registerCredentials = {
      "username": localStorage.getItem("username"),
      "email":localStorage.getItem("email"),
      "password": localStorage.getItem("password"),
      "subjects": this.httpService.allCheckedSubjects,
      "schedule": this.httpService.periods
    }
    console.log("credentials", registerCredentials);
    console.log("checked subs",this.httpService.allCheckedSubjects);
    console.log("periods", this.httpService.periods);
    this.httpService.registerUser(registerCredentials).subscribe((data:any)=>{

    });
  }

  checkRegisterValidation(){
    let checkedSubs = false;
    for(let i = 0; i< this.httpService.subjects.length; i++){
      if(this.httpService.subjects[i].checked == true ||
        this.httpService.subjects[i].SIP == true || 
        this.httpService.subjects[i].ZIP == true){
        checkedSubs = true;
        break;
      }
    }
    let hasScheduleData = true;
    for(let k = 0; k<this.httpService.periods.length; k++){
      if(this.httpService.periods[k].periods.length==0){
        hasScheduleData = false;
        break;
      }
    }

    if(
    !isNull(localStorage.getItem("username")) &&
    !isNull(localStorage.getItem("email")) &&
    !isNull(localStorage.getItem("password")) &&
    localStorage.getItem("username")!=""&&
    localStorage.getItem("email")!="" &&
    localStorage.getItem("password")!="" &&
    checkedSubs == true && hasScheduleData == true){
      return false;
    }else{
      return true;
    }
  }

  openLogin(){
    this.router.navigate(['/login']);    
  }

  ngOnDestroy(): void {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

}
