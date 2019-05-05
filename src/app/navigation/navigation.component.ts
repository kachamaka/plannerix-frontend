import { StorageService } from './../shared/storage.service';
import { Component, OnInit, ViewContainerRef, Renderer, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  mode = "over";
  cssUrl: string;

  constructor(
    // public viewContainer:ViewContainerRef,
    public sanitizer: DomSanitizer,
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
    if (this.storageService.currentUrl=="home"||this.storageService.currentUrl==""){
      return "home";
    }else{
      return this.storageService.currentUrl;
    }
  }
  
  test(){
    console.log(this.setColor()=="settings");
  }

  ngOnInit(){
    // let sidebar_backdrop = document.getElementsByClassName("ng-sidebar__backdrop");
    // console.log(sidebar_backdrop[0]);

    // setInterval(()=>{

    //   let sidebar_backdrop = document.getElementsByClassName("ng-sidebar__backdrop"); 
    //   console.log(sidebar_backdrop.item(0));
    // }, 1000)
  }

}
