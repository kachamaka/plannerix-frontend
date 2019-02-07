import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public previousUrl: string;
  public currentUrl: string;
  public fullUrl: string;

  constructor(private router: Router) {
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.previousUrl = this.currentUrl;
        this.fullUrl = val.url;
        this.currentUrl = val.url.split("/")[1];
      }
    })
   }
}
