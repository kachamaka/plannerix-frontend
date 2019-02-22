import { StorageService } from './../../shared/storage.service';
import { SingleSubject } from './../../models/subject.model';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { isNull } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  constructor(private storageService: StorageService,
    private httpService: HttpService){

  }
  
  ngOnInit() {
    
  }

  log(){
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
    this.httpService.registerUser(registerCredentials);
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

    if(
    !isNull(localStorage.getItem("username")) &&
    !isNull(localStorage.getItem("email")) &&
    !isNull(localStorage.getItem("password")) &&
    localStorage.getItem("username")!=""&&
    localStorage.getItem("email")!="" &&
    localStorage.getItem("password")!="" &&
    checkedSubs == true){
      return false;
    }else{
      return true;
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  }

}
