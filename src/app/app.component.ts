import { StorageService } from './shared/storage.service';
import { HeaderComponent } from './header/header.component';
import { HttpService } from './shared/http.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { slideInAnimation } from './animation';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(-100%, 0, 0)'
      })),
      transition('in => out', animate('250ms ease-in-out')),
      transition('out => in', animate('250ms ease-in-out'))
    ]),
  ]
})
export class AppComponent implements OnInit {
  title = 'plannerix';
  @ViewChild(HeaderComponent) header: HeaderComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    public storageService: StorageService,
    private httpService: HttpService,
    private router: Router) {

  }
  ngOnInit(){
    let tokenData = {
      token: localStorage.getItem("token")
    }
    this.showNav();
    setTimeout(() => {
      this.onResize();
    }, 200);
    window.addEventListener("resize", this.onResize.bind(this));
    navigator.serviceWorker.register("sw-worker-custom.js").then(res=>{
      console.warn("Registration succeeds:", res);
      res.update().then(ures => {
        // console.log("Updated", ures);
      }).then(err=>{
        // console.log("Error with pdate of service worker:",err);
      })
    }).catch(err =>{
      // console.log("An error occured when registering service worker", err);
    }).finally().then(fin=>{
      // console.log("Yeah dont know bout this one", fin)
    })
    this.httpService.loadSubjects();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  showNav() {
    let url= this.router.url;
    let routesToHideNav = ["desktop", "login", "register", "link"];
    for(let i=0; i < routesToHideNav.length; i++) {
      if (url.includes(routesToHideNav[i])){
        return true;
      }
    }
    return false;
    // console.log(url);
  }
  onResize() {
    let url= this.router.url;
    if (window.innerWidth < 800) {
      if (url.includes("desktop")) {
        this.router.navigate(["/home"]);
      }
    } else {
      if (!url.includes("desktop")) {
        this.httpService.edit = false;
        this.router.navigate(["/desktop"]);
        this.menuState = 'out';
      }
    }
  }

  menuState:string = 'out';
  menuStateBefore:string;
 
  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  toggleMenuFalse(e){
    // console.log(this.storageService.isDesktop());
    if(this.storageService.isDesktop()==false){
      this.menuState = this.header.toggleMenuFalse(e);
    }
    // console.log(e.target.id);
    // if(e.target.id=="sidebar"){
    //   this.toggleMenu();
    // }else{
    //   this.menuState = 'out';
    // }
  }


}
