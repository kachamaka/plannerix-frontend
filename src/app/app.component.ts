import { HttpService } from './shared/http.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit {
  title = 's-org';

  constructor(private httpService: HttpService, private router: Router) {

  }
  ngOnInit(){
    let tokenData = {
      token: localStorage.getItem("token")
    }
    this.httpService.loadSchedule();
    this.httpService.loadSubjects();
    this.showNav();
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
    navigator.serviceWorker.register("sw-worker-custom.js").then(res=>{
      console.warn("Registration succeeds:", res);
      res.update().then(ures => {
        console.log("Updated", ures);
      }).then(err=>{
        console.log("Error with pdate of service worker:",err);
      })
    }).catch(err =>{
      console.log("An error occured when registering service worker", err);
    }).finally().then(fin=>{
      console.log("Yeah dont know bout this one", fin)
    })
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  showNav() {
    let url= this.router.url;
    let routesToHideNav = ["desktop", "login", "register"];
    for(let i=0; i < routesToHideNav.length; i++) {
      if (url.includes(routesToHideNav[i])){
        return true;
      }
    }
    return false;
    // console.log(url);
  }
  onResize() {
    // window.addEventListener("resize",)
    let url= this.router.url;
    if (window.innerWidth < 800) {
      if (url.includes("desktop")) {
        this.router.navigate(["/home"]);
      }
    } else {
      if (!url.includes("desktop")) {
        this.router.navigate(["/desktop"]);
      }
    }
  }

}
