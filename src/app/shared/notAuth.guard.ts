import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotAuthGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // console.log(this.httpService.isLogged());
      if(this.httpService.isLogged()==false){
        return true;
      }else{
        //check for desktop or mobile
        this.router.navigate(['/home']);            
        return false;
      }
  }
}
