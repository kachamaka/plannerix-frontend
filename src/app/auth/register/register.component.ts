import { SnackbarComponent } from './../../shared/snackbar/snackbar.component';
import { StorageService } from './../../shared/storage.service';
import { HttpService } from './../../shared/http.service';
import { Component, OnInit, OnDestroy} from '@angular/core';
import { isNull } from 'util';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  username = "";
  email = "";
  password = "";
  confirmPassword = "";
  usernameError;
  emailError;
  passwordError;
  confirmPasswordError;
  
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private snackBar: MatSnackBar,
    public storageService: StorageService,
    private router: Router,
    private httpService: HttpService){

  }
  
  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.max(16)])],
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.max(35)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
    })
  }

  register(){
    let registerCredentials = {
      "username": this.username,
      "email": this.email,
      "password": this.password
      // "subjects": this.httpService.allCheckedSubjects,
      // "schedule": this.httpService.periods
    }
    console.log(registerCredentials);
    // console.log("credentials", registerCredentials);
    // console.log("checked subs",this.httpService.allCheckedSubjects);
    // console.log("periods", this.httpService.periods);
    this.httpService.registerUnverifiedUser(registerCredentials).subscribe((data:any)=>{
      // console.log(data);
      if(data.success == false){
        this.toastr.error(data.errMsg, "Грешка при регистрацията!");
      }else{
        // localStorage.setItem("token", data.token);
        this.toastr.success("Регистрацията е успешна!");
        this.username = "";
        this.email = "";
        this.password = "";
        this.confirmPassword = "";
        // this.router.navigate(['/home']);
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
    // let checkedSubs = false;
    // for(let i = 0; i< this.httpService.subjects.length; i++){
    //   if(this.httpService.subjects[i].checked == true ||
    //     this.httpService.subjects[i].SIP == true || 
    //     this.httpService.subjects[i].ZIP == true){
    //     checkedSubs = true;
    //     break;
    //   }
    // }
    // let hasScheduleData = true;
    // for(let k = 0; k<this.httpService.periods.length; k++){
    //   if(this.httpService.periods[k].periods.length==0){
    //     hasScheduleData = false;
    //     break;
    //   }
    // }

    // console.log(typeof this.username, this.email, this.password);
    if(
    this.username != ""&&
    this.email != "" &&
    this.password != "" &&
    this.confirmPassword != "" &&
    this.confirmPassword == this.password){
      return false;
    }else{
      return true;
    }
  }
  test(){
    console.log("test");
  }

  openLogin(){
    this.router.navigate(['/login']);    
  }

  usernameValid(){
    if(this.httpService.usernameRegex.test(this.username)){
      this.usernameError = "";
      return true;
    }else{
      if(this.username == ""){
        this.usernameError = "*Това поле е задължително";
        this.registerForm.controls["username"].setErrors({invalid: true});
      }else{
        this.usernameError = "*Невалидно потребителско име";
        this.registerForm.controls["username"].setErrors({invalid: true});
      }
      return false;
    }
  }
  
  validateEmail(){
    if(this.httpService.emailRegex.test(this.email)){
      this.emailError = "";
      return true;
    }else{
      if(this.email == ""){
        this.emailError = "*Това поле е задължително";
        this.registerForm.controls["email"].setErrors({invalid: true});
      }else{
        this.emailError = "*Невалиден имейл адрес";
        this.registerForm.controls["email"].setErrors({invalid: true});
      }
    }
    return false;
  }
  
  validatePassword(){
    if(this.httpService.passwordRegex.test(this.password)){
      this.passwordError = "";
      return true;
    }else{
      if(this.password == ""){
        this.passwordError = "*Това поле е задължително";
        this.registerForm.controls["password"].setErrors({invalid: true});
      }else{
        this.passwordError = "*Невалидна парола";
        this.registerForm.controls["password"].setErrors({invalid: true});
      }
    }
    return false;
  }
  
  validateConfirmPassword(){
    if(this.confirmPassword == ""){
      this.confirmPasswordError = "*Това поле е задължително";
      this.registerForm.controls["confirmPassword"].setErrors({invalid: true});
      return false;
    }
    if(this.password != this.confirmPassword){
      this.confirmPasswordError = "*Паролите не съвпадат";
      this.registerForm.controls["confirmPassword"].setErrors({invalid: true});
      return false;
    }
    this.confirmPasswordError = ""
    return true;
  }


}
