import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  public previousUrl: string;
  public currentUrl: string;
  public fullUrl: string;
  public routeName: string;

  constructor(private router: Router) {
    router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        this.previousUrl = this.currentUrl;
        this.fullUrl = val.url;
        this.currentUrl = val.url.split("/")[1];
      }
    })
   }
   
   isDesktop() {
    let url= this.router.url;
    let routesToHideNav = ["desktop", "login", "register"];
    for(let i=0; i < routesToHideNav.length; i++) {
      // console.log(i);
      if (url.includes(routesToHideNav[i])){
        // console.log(true)
        return true;
      }
    }
    return false;
  }
  

  getRouteName(){
    this.router.events.subscribe((val)=>{
      if(val instanceof NavigationEnd){
        let url = val.url.split("/")[1];
        switch (url) {
          case "calendar":
            this.routeName = "График";
            break;
            
          case "schedule":
          this.routeName = "Програма";
          break;
          
          case "grades":
            this.routeName = "Оценки";
            break;
            
          case "settings":
          this.routeName = "Настройки";
          break;

          case "home":
            this.routeName = "Накратко";
            break;
        
          default:
            break;
        } 
      }
    })
  }

}
