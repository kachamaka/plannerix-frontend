import { SingleSubject } from './../../models/subject.model';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  constructor(
    private httpService: HttpService){

  }
  
  ngOnInit() {
  }

  log(){
    let checkedSubjects: SingleSubject[] = [];
    this.httpService.subjects.forEach(subject => {
      if(subject.checked == true || subject.SIP == true || subject.ZIP == true){
        checkedSubjects.push(subject);
      }
    });
    let registerCredentials = {
      "username": localStorage.getItem("username"),
      "firstname":localStorage.getItem("firstname"),
      "password": localStorage.getItem("password")
    }
    console.log("credentials", registerCredentials);
    // console.log("subjects",this.httpService.subjects);
    console.log("checked subs",checkedSubjects);
    console.log("additional subs",this.httpService.additionalSubjects);
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
    // this.httpService.subjects.forEach(subject => {
    //   if(subject.checked == true || subject.SIP == true || subject.ZIP == true){
    //     checkedSubs = true;
    //     return;
    //   }
    // });
    if(localStorage.getItem("username")!=""&&
    localStorage.getItem("firstname")!="" &&
    localStorage.getItem("password")!="" &&
    checkedSubs == true){
      return false;
    }else{
      return true;
    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem("username");
    localStorage.removeItem("firstname");
    localStorage.removeItem("password");
  }

}
