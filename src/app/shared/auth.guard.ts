import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private location: Location,
    private httpService: HttpService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // console.log(this.httpService.isLogged());
      if(this.httpService.isLogged()==true){
        return true;
      }else{
        //check for desktop or mobile
        if(location.pathname == '/login' || location.pathname.includes('/register')){
          this.router.navigate([location.pathname]);            
        }else{
          this.router.navigate(['/login']);            
        }
        return false;
      }
  }
}
