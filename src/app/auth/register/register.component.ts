import { SnackbarComponent } from './../../shared/snackbar/snackbar.component';
import { StorageService } from './../../shared/storage.service';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { isNull } from 'util';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  constructor(
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    public storageService: StorageService,
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
      // console.log(data);
      if(data.success == false){
        this.toastr.error(data.errMsg, "Грешка при регистрацията!");
      }else{
        localStorage.setItem("token", data.token);
        this.toastr.success("Регистрацията е успешна!");
        this.router.navigate(['/home']);
      }
    });
  }

  openSnackbar(){
    this.toastr.success('Hello world!', 'Toastr fun!', {
      timeOut: 1500
    });
    // let config = new MatSnackBarConfig();
    // config.panelClass = ['snackbar']
    // console.log(window.innerWidth);
    // let verticalPosition;
    // if(window.innerWidth>=800){
    //   verticalPosition = 'top';      
    // }else{
    //   verticalPosition = 'bottom';      
    // }
    // this.snackBar.openFromComponent(SnackbarComponent, {
    //   duration: 180000,
    //   horizontalPosition: 'right',
    //   verticalPosition: verticalPosition,
    //   panelClass: ['snackbar']
    // });
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
