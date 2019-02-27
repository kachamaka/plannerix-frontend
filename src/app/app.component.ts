import { HttpService } from './shared/http.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { slideInAnimation } from './animation';
import { SwUpdate } from '@angular/service-worker';

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

  constructor(private httpService: HttpService,private sw: SwUpdate, private router: Router) {
    sw.available.subscribe((event)=>{
      sw.activateUpdate().then(()=>document.location.reload());
    })
  }
  ngOnInit(){
    let tokenData = {
      token: localStorage.getItem("token")
    }
    // this.httpService.loadSchedule();
    this.httpService.loadSubjects();
    this.showNav();
    setTimeout(()=>{
      this.showNav()
    }, 2000);
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  showNav() {
    let url= this.router.url;
    let routesToHideNav = ["desktop"];
    for(let i=0; i < routesToHideNav.length; i++) {
      if (url.includes(routesToHideNav[i])){
        return true;
      }
    }
    return false;
    // console.log(url);
  }

}
