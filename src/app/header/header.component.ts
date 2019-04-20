import { StorageService } from 'src/app/shared/storage.service';
import { HttpService } from './../shared/http.service';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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
export class HeaderComponent implements OnInit {

  routeName: string;
  constructor(
    public httpService: HttpService,
    public storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    this.storageService.getRouteName();
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

  menuState:string = 'out';
  menuStateBefore:string;
  
  toggleMenu() {
    // 1-line if statement that toggles the value:
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  toggleMenuFalse(e){
    // console.log(e.target.id);
    if(e.target.id=="sidebar"){
      this.toggleMenu();
    }else{
      this.menuState = 'out';
    }
    return this.menuState;
  }
}
