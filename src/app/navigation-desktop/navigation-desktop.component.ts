import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-desktop',
  templateUrl: './navigation-desktop.component.html',
  styleUrls: ['./navigation-desktop.component.css']
})
export class NavigationDesktopComponent implements OnInit {

  mode = "over";
  cssUrl: string;

  constructor(
    // public viewContainer:ViewContainerRef,
    public router: Router,
    private storageService: StorageService){
  }
  
  _opened: boolean = false;
 
  _toggleSidebar() {
    this._opened = !this._opened;

    // let dom = new BrowserDomAdapter();
    //    let el = this.viewContainer.element.nativeElement; 
    //    let myEle = dom.getElementsByClassName(el, "ng-sidebar__backdrop")[0];
    // console.log(myEle);
    setTimeout(() => {
      let sidebar_backdrop = document.getElementsByClassName("ng-sidebar__backdrop"); 
      let sidebar = sidebar_backdrop.item(0);
      console.log(sidebar);
      sidebar.classList.add("sidebar");
    }, 10);
    
  }
  
  setColor(){
    // console.log(this.storageService.fullUrl);
    if (this.storageService.fullUrl=="/desktop/home"||this.storageService.fullUrl==""){
      return "/desktop/home";
    }else{
      return this.storageService.fullUrl;
    }
  }
  
  test(e?){
    console.log(e.target);
  }

  changeRoute(route){
    this.router.navigate([route]);
  }


  ngOnInit() {
  }

}
